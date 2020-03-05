import React from "react"
import { compose } from "recompose"
import { withFormik, Field } from "formik"
import * as Yup from "yup"
import AsyncSelect from "react-select/lib/Async"
import addSkill from "../../mutations/addSkill"
import removeSkill from "../../mutations/removeSkill"
import { graphql } from "react-apollo"
import withNotif from "../../components/notification"
import gql from "graphql-tag"
import { getAllResources } from '../../helpers/asyncQueries'

const GET_SKILLS = gql`
  query($token: String) {
    viewer(token: $token) {
      myAgent {
        id
        agentSkillRelationships {
          id
          resourceClassification {
            name
            id
          }
        }
        agentSkills {
          id
          name
        }
      }
    }
  }
`

const customStyles = {
  control: base => ({
    ...base,
    color: "#333",
    marginBottom: "16px",
  }),
  input: base => ({
    ...base,
    color: "#333",
  }),
  singleValue: base => ({
    ...base,
    color: "#333",
  }),
  placeholder: base => ({
    ...base,
    color: "#333",
    fontSize: "14px",
  }),
}

export default compose(
  withNotif(
    "Skills are successfully updated",
    "Error, skills have not been updated correctly"
  ),
  graphql(addSkill, { name: "addSkillMutation" }),
  graphql(removeSkill, { name: "removeSkillMutation" }),
  withFormik({
    mapPropsToValues: props => ({
      agentSkills: props.skills,
    }),
    validationSchema: Yup.object().shape({
      agentSkills: Yup.object().required("Classification is a required field"),
    }),
  })
)(
  ({
    client,
    setFieldValue,
    values,
    addSkillMutation,
    onSuccess,
    onError,
    data,
    providerId,
    removeSkillMutation,
  }) => {
    const editSkills = val => {
      const removed = values.agentSkills.filter(
        o => !val.some(o2 => o.value === o2.value)
      )
      const added = val.filter(
        o => !values.agentSkills.some(o2 => o.value === o2.value)
      )
      if (removed.length > 0) {
        const relToDelete = data.myAgent.agentSkillRelationships.filter(
          r => r.resourceClassification.id === removed[0].value)
        removed.map(r => {
            return removeSkillMutation({
              variables: {
                id: Number(relToDelete[0].id),
              },
            })
            .then(res => {
                setFieldValue("agentSkills", val)
                return onSuccess()
              }
            )
            .catch(err => onError())
        })
      } else {
        addSkillMutation({
          variables: {
            skillId: added[0].value,
            agentId: providerId,
          },
          update: (store, { data }) => {
            const skills = store.readQuery({
              query: GET_SKILLS,
              variables: {
              },
            })
            skills.myAgent.agentSkills.push(
              data.createAgentResourceClassification.agentResourceClassification
                .resourceClassification
            )
            store.writeQuery({
              query: GET_SKILLS,
              data: skills,
              variables: {
              },
            })
          },
        })
          .then(res => {
              setFieldValue("agentSkills", val)
              return onSuccess()
          })
          .catch(err => onError())
      }
    }
    return (
      <Field
        name="agentSkills"
        render={({ field }) => (
          <AsyncSelect
            placeholder="Add more skills..."
            defaultOptions={true}
            cacheOptions={true}
            isClearable={false}
            isMulti={true}
            value={field.value}
            styles={customStyles}
            onChange={val => editSkills(val)}
            loadOptions={val => getAllResources(client, providerId, val)}
          />
        )}
      />
    )
  }
)
