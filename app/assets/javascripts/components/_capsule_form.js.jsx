/** @jsx React.DOM */

var CapsuleForm = React.createClass({
  handleSubmit: function ( event ) {
    event.preventDefault();

    var name = this.refs.name.getDOMNode().value.trim();
    var description = this.refs.description.getDOMNode().value.trim();

    // validate
    if (!description || !name) {
      return false;
    }

    // submit
    var formData = $( this.refs.form.getDOMNode() ).serialize();
    this.props.onCommentSubmit( formData, this.props.form.action );

    // reset form
    this.refs.name.getDOMNode().value = "";
    this.refs.description.getDOMNode().value = "";
  },
  render: function () {
    return (
      <form ref="form" className="capsule-form" action={ this.props.form.action } accept-charset="UTF-8" method="post" onSubmit={ this.handleSubmit }>
        <p><input type="hidden" name={ this.props.form.csrf_param } value={ this.props.form.csrf_token } /></p>
        <p><input ref="name" name="capsule[name]" placeholder="Your name" /></p>
        <p><descriptionarea ref="text" name="capsule[description]" placeholder="Say something..." /></p>
        <p><button type="submit">Post capsule</button></p>
      </form>
    )
  }
});
