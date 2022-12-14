import React from 'react';
import ReactDOM from 'react-dom';

import PropTypes from 'prop-types';
// https://qiita.com/ayatas/items/05f75cb50dd9f0ffd065
class Modal extends Component {
    constructor(props) {
        super(props);
        this.rootEl = document.getElementById('root');
    }
    render() {
        return (
            ReactDOM.createPortal(
                <div
                    style={{
                        position: 'fixed',
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        top: 0,
                        left: 0,
                    }}
                >
                    <div
                        style={{
                            position: 'fixed',
                            width: '50%',
                            height: '50%',
                            backgroundColor: 'white',
                        }}
                    >
                        <button onClick={this.props.onClose}>Close</button>
                    </div>
                </div>,
                this.rootEl)
        );
    }
}

Modal.protoTypes = {
    onClose: PropTypes.func,
}

export default Modal;