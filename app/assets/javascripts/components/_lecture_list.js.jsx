/** @jsx React.DOM */

var LectureList = React.createClass({
  render: function () {
    var lectureNodes = this.props.lectures.map(function ( lecture ) {
      return <Lecture name={ lecture.name } description={ lecture.description } key={ lecture.id } />
    });

    return (
      <div className="lecture-list">
        { lectureNodes }
      </div>
    )
  }
});
