/** @jsx React.DOM */

var placeholder = document.createElement("div");
placeholder.className = "placeholder";

var FileList = React.createClass({
    getInitialState: function() {
        return {files: this.props.files};
    },
    render: function () {
        var fileNodes = this.props.files.map(function ( file ) {
            return <File dragStart={ this.dragStart } dragEnd={ this.dragEnd }  name={ file.name } key={ file.id } />
        }, this);

        return (
            <div onDragOver={this.dragOver} id="course-files" className="panel">
            { fileNodes }
            </div>
        )
    },
    dragStart: function(e) {

        console.log('dragStart');
        this.dragged = e.currentTarget;
        e.dataTransfer.effectAllowed = 'move';

        // Firefox requires dataTransfer data to be set
        e.dataTransfer.setData("text/html", e.currentTarget);
    },
    dragEnd: function(e) {

        console.log('dragEnd');
        this.dragged.style.display = "block";
        this.dragged.parentNode.removeChild(placeholder);

        // Update data
        var files = this.state.files;
        var from = Number(this.dragged.dataset.id);
        var to = Number(this.over.dataset.id);
        if(from < to) to--;
        if(this.nodePlacement == "after") to++;
        files = files.splice(to, 0, files.splice(from, 1)[0]);
        this.setState({files: files});
    },
    dragOver: function(e) {
        e.preventDefault();
        this.dragged.style.display = "none";
        if(e.target.className == "placeholder") return;
        this.over = e.target;
        // Inside the dragOver method
        var relY = e.clientY - this.over.offsetTop;
        var height = this.over.offsetHeight / 2;
        var parent = e.target.parentNode;

        if(relY > height) {
            this.nodePlacement = "after";
            parent.insertBefore(placeholder, e.target.nextElementSibling);
        }
        else if(relY < height) {
            this.nodePlacement = "before"
            parent.insertBefore(placeholder, e.target);
        }
    }
});
