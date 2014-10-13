/** @jsx React.DOM */

var File = React.createClass({
    getInitialState: function () {
        return {};
    },
    render: function () {
        return (
            <div data-id={this.props.key}
                key={this.props.key}
                draggable="true"
                onDragStart={this.props.dragStart}
                onDragEnd={this.props.dragEnd}
                className="course-file">
                <a target="_blank" href="https://google.com/">{this.props.name}</a>
            </div>);
            }
            });
