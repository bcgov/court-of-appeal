import React from 'react';
import '../components/infomodal.css';
import InfoModal from "./InfoModal";

class FactumInfoModal extends InfoModal {

    render() {
        let content = null;

        if (this.props.show) {
            content =
                <InfoModal
                    title="The Factum and Appeal Book"
                    close={this.props.close}
                />
        }
        return content;
    }

}
export default FactumInfoModal;