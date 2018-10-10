import React,{Component} from 'react';
import { Field, reduxForm } from 'redux-form'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {createPost} from '../actions';

class PostsNew extends Component{
  renderField(field){
    const className=`form-group ${field.meta.touched && field.meta.error ? 'has-danger' : ""}`;
    return(
      <div className={className}>
      <label>{field.label}</label>
      <input
      className="form-control"
      type="text"
      {...field.input}
      />
      <div className="text-help">
      {field.meta.touched ? field.meta.error : ""}
      </div>
      </div>
    );
  }

  onSubmit(values){
    //this === component for .bind(this) because its outside render method.
    //So this will be undefined .
    this.props.createPost(values, () => {
      this.props.history.push('/');
    });
  }
  render(){
    const { handleSubmit } = this.props;

    return(
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
         <Field
            label="Title:"
            name="title"
            component={this.renderField}
          />
         <Field
            label="Categories:"
            name="categories"
            component={this.renderField}
            />
          <Field
            label="Content:"
            name="content"
            component={this.renderField}
              />

          <button type="submit" className="btn btn-success">
              Save
          </button>
          <Link className="btn btn-danger" to="/">
            Cancel
          </Link>

      </form>
    );
  }
}
function validate(values){
  const errors ={};
  //Validate the input from 'values'
  if(!values.title){
    errors.title="Enter a title";
  }
  if(!values.categories){
    errors.categories="Enter some categories";
  }
  if(!values.content){
    errors.content="Enter content for your title";
  }
  //If errors is empty the form is OK to submit.
  //If error has any properties,redux form assumes form is invalid
  return errors;

}
export default reduxForm({
  validate:validate,
  form:'PostsNewForm'
})(
  connect(null,{ createPost })(PostsNew)
);
