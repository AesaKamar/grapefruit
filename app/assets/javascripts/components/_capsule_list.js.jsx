/** @jsx React.DOM */

var CapsuleList = React.createClass({
  render: function () {
    var capsuleNodes = this.props.capsules.map(function ( capsule ) {
      return <Capsule name={ capsule.name } description={ capsule.description } key={ capsule.id } lectures={ capsule.lectures } />
    });

    return (
      <div className="capsule-list">
        { capsuleNodes }
      </div>
    )
  }
});
