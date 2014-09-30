/** @jsx React.DOM */

var Capsule = React.createClass({
    getInitialState: function () {
        return {
            class       : 'closed',
            edit        : 0,
            title       : this.props.name,
            description : this.props.description,
            lectures    : this.props.lectures
        };
    },
    expand: function () {

        if(this.state.class == 'closed') {

            this.setState({class: 'open'});

        } else {

            this.setState({class: 'closed'});

        }

    },
    edit: function () {
        // if(this.state.edit) {

        //     var title, description;

        //     title = this.refs.title.getDOMNode().value;
        //     description = this.refs.description.getDOMNode().value;

        //     if(title && description) {
        //         this.setState({ title: title, description: description, edit: this.state.edit ? 0 : 1});
        //     }
        // } else {
            this.setState({edit: this.state.edit ? 0 : 1});
        // }

    },
    updateTitle: function () {

        this.setState({title: this.refs.title.getDOMNode().value })
    },
    updateDescription: function () {

        this.setState({description: this.refs.description.getDOMNode().value })
    },
    render: function () {

        var edit = this.state.edit ? 'Finished Editing' : 'Edit Capsule';

        if(this.state.edit) {
            return (
                <div className="capsule-container">

                    <h4>
                    Capsule: <input ref="title" onChange={this.updateTitle} defaultValue={this.state.title}></input>
                    </h4>

                    <div className={ 'capsule ' + this.state.class} id="capsule-{this.props.key}">
                        <textarea ref="description" onChange={this.updateDescription} defaultValue={this.state.description}></textarea>

                        <p>

                            <a className="add" onClick={this.edit}>{ edit }</a>
                            <a className="add alert">remove capsule</a>

                            <span className="space"></span>

                            <a className="add secondary slide-reveal">show files</a>
                            <a className="add secondary">view as student &#10148;</a>

                            <span className="space"></span>

                            <a className="add">add lecture</a>

                        </p>

                        <div id="capsule-{ this.props.key }-files" className="reveal-hidden panel">

                            <p>No capsule files yet!</p>
                            <h6>Capsule Files (examples: chapter summary, reference sheets, etc)</h6>


                            <h5><a href="https://google.com" className="">add file</a></h5>

                        </div>

                        <p className="grey">
                        Lectures ({ this.state.lectures.length } total)
                        </p>

                        <LectureList lectures={ this.state.lectures } />


                    </div>
                </div>);
        } else {
            return (
                <div className="capsule-container">

                    <h4>
                    Capsule: <a onClick={this.expand}>{this.state.title}</a>
                    </h4>

                    <div className={ 'capsule ' + this.state.class} id="capsule-{this.props.key}">
                        <p>{this.state.description}</p>

                        <p>

                            <a className="add" onClick={this.edit}>{ edit }</a>
                            <a className="add alert">remove capsule</a>

                            <span className="space"></span>

                            <a className="add secondary slide-reveal">show files</a>
                            <a className="add secondary">view as student &#10148;</a>

                            <span className="space"></span>

                            <a className="add">add lecture</a>

                        </p>

                        <div id="capsule-{ this.props.key }-files" className="reveal-hidden panel">

                            <p>No capsule files yet!</p>
                            <h6>Capsule Files (examples: chapter summary, reference sheets, etc)</h6>


                            <h5><a href="https://google.com" className="">add file</a></h5>

                        </div>

                        <p className="grey">
                        Lectures ({ this.state.lectures.length } total)
                        </p>

                        <LectureList lectures={ this.props.lectures } />


                    </div>
                </div>);
        }
    }
});
