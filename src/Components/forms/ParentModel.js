// 親コンポーネント
import React, { Component } from 'react';
import ChildModel from './ChildModel';

class ParentModel extends Component {
  constructor(props) {
    super(props);
    this.onClickModal = this.onClickModal.bind(this);
    this.state = {
      isActiveModal: true
    };
  }

  // onClickModal(e) {

  //     e.preventDefault();
  //     this.setState({
  //         isActiveModal: !this.state.isActiveModal
  //     });
  //     console.log(this);
  // }

  onClickModal = event => {
    alert(this.state);
    event.preventDefault();
    // this.setState({
    //     isActiveModal: !this.state.isActiveModal

    // });
    // console.log(this);

    this.setState(
      {
        isActiveModal: !this.state.isActiveModal
      },
      () => console.log(this.state)
    );
  };

  render() {
    return (
      <div className="section">
        <ChildModel
          isActiveModal={this.state.isActiveModal}
          onClickModal={() => this.onClickModal()}
        />
      </div>
    );
  }
}

export default ParentModel;