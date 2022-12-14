import React, { Component } from 'react';
// http://shibe23.hatenablog.com/entry/2018/07/29/233005
class ChildModel extends Component {

    constructor(props) {
        super(props)
    }

    

    render() {
        return (
        <div>
            <div className="content has-text-centered">
                <button
                    className="btn btn-primary"
                    onClick={() => this.props.onClickModal()}
                >
                    Click!
                </button>
            </div>

            <div className={'modal ' + (this.props.isActiveModal ? 'is-active' : '')}>
                    <div className="modal-background  modal-wrapper" 
                            onClick={() => this.props.onClickModal()}
                    ></div>
                    <p>This is Modal.</p>
                </div>

            {/* <div className={
                "modal " + (this.props.isActiveModal ? "is-active" : "")
                }
                tabIndex="-1"
                role="dialog"
            >
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Modal title</h5>
                            <button 
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                            <span aria-hidden="true">&times;</span>
                            </button>
                            </div>

                            <div className="modal-body">
                                <p>Modal body text goes here.</p>
                            </div>
                            <div className="modal-footer">
                                <button 
                                    type="button"
                                    className="btn btn-secondary"
                                    data-dismiss="modal"
                                >
                                Close
                                </button>

                                <button type="button" className="btn btn-primary">
                                Save changes
                                </button>
                            </div>
                        </div>
                    </div>
            </div> */}
        </div>
        );
    }
}

export default ChildModel