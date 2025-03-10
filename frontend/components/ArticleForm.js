import React, { useEffect, useState } from 'react'
import PT from 'prop-types'
import { axiosWithAuth } from '../axios'

const initialFormValues = { title: '', text: '', topic: '' }

export default function ArticleForm(props) {
  const [values, setValues] = useState(initialFormValues)
  // ✨ where are my props? Destructure them here

  const {postArticle, currentArticleId, currentArticle, setCurrentArticleId, updateArticle, setMessage} = props




  useEffect(() => {

    

    if(currentArticleId != null){
      setMessage('')
      setValues({ title: currentArticle.title, text: currentArticle.text, topic: currentArticle.topic})
    }else {
      setValues(initialFormValues)
    }







    // ✨ implement
    // Every time the `currentArticle` prop changes, we should check it for truthiness:
    // if it's truthy, we should set its title, text and topic into the corresponding
    // values of the form. If it's not, we should reset the form back to initial values.
  }, [currentArticleId])




  const onChange = evt => {
    const { id, value } = evt.target
    setValues({ ...values, [id]: value })
    console.log(values)
  }

  const onSubmit = evt => {
    evt.preventDefault()

    currentArticle? 
    updateArticle(currentArticle.article_id, values) : postArticle(values)  

    setValues(initialFormValues)




    // ✨ implement
    // We must submit a new post or update an existing one,
    // depending on the truthyness of the `currentArticle` prop.
  }

  const isDisabled = () => {
    // ✨ implement
    // Make sure the inputs have some values

    if(((values.topic).length > 0) && ((values.text).length > 0) && ((values.title).length > 0) ){
      return false
    }
    return true
  }

  return (
    // ✨ fix the JSX: make the heading display either "Edit" or "Create"
    // and replace Function.prototype with the correct function
    <form id="form" onSubmit={onSubmit}>
      <h2>{currentArticleId? "Edit" : "Create"} Article</h2>
      <input
        maxLength={50}
        onChange={onChange}
        value={values.title}
        placeholder="Enter title"
        id="title"
      />
      <textarea
        maxLength={200}
        onChange={onChange}
        value={values.text}
        placeholder="Enter text"
        id="text"
      />
      <select onChange={onChange} id="topic" value={values.topic}>
        <option value="">-- Select topic --</option>
        <option value="JavaScript">JavaScript</option>
        <option value="React">React</option>
        <option value="Node">Node</option>
      </select>
      <div className="button-group">
        <button disabled={isDisabled()} id="submitArticle" >Submit</button>
        {currentArticleId? <button onClick={
          () => {
          setValues(initialFormValues)
          setCurrentArticleId(null)
          }
          }>Cancel edit</button> : null}
      </div>
    </form>
  )
}

// 🔥 No touchy: LoginForm expects the following props exactly:
ArticleForm.propTypes = {
  postArticle: PT.func.isRequired,
  updateArticle: PT.func.isRequired,
  setCurrentArticleId: PT.func.isRequired,
  currentArticle: PT.shape({ // can be null or undefined, meaning "create" mode (as opposed to "update")
    article_id: PT.number.isRequired,
    title: PT.string.isRequired,
    text: PT.string.isRequired,
    topic: PT.string.isRequired,
  })
}
