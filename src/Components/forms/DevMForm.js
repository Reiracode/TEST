import React, { Component } from 'react';
import DevModal from "./DevModal";
// http://localhost:3000/devform
// https://dev.to/achowba/building-a-modal-in-react-15hg
// 缺點 render 時 lightbox background 可能會有問題 無法到最高層
class DevMForm extends Component {
    constructor() {
        super();
        this.state = {
            isShowing: false
        }
    }

    // openModalHandler = () => {
    //     this.setState({
    //         isShowing: true
    //     });
    // }

    // closeModalHandler = () => {
    //     this.setState({
    //         isShowing: false
    //     });
    // }

    toggleModal = (e) => {
        e.preventDefault();
        this.setState({
            isShowing:!this.state.isShowing
           
        });

        // this.setState((prevState, props) => ({
        //     isShowing: !prevState.isShowing
        // }));
    }


    render() {
        return (
        <div>
            {this.state.isShowing 
            ? (<div onClick={this.toggleModal}  className="back-drop"/>) 
            : null }

            <button className="open-modal-btn" onClick={this.toggleModal}>
                Open Modal
            </button>

            <DevModal className="modal"  show={this.state.isShowing}   close={this.toggleModal}>
                Maybe aircrafts fly very high because they don't want to
                be seen in plane sight?
            </DevModal>
        </div>
        );
    }
}

export default DevMForm;

// class A extends React.Component {
//     constructor() {
//         super()
//         this.handleCheckBox = this.handleCheckBox.bind(this)
//         this.state = {
//             checked: false
//         }
//     }

//     handleCheckBox(e) {
//         this.setState({
//             checked: e.target.checked
//         })
//     }

//     render() {
//         return <input type="checkbox" onChange={this.handleCheckBox} checked={this.state.checked} />
//     }
// }

// ReactDOM.render(<A />, document.getElementById('app'))