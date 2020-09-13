import React from 'react';
import './footer.scss';

interface IState {

};

interface IProps {

}

class Footer extends React.Component<IProps, IState> {

  render() {
    return (
      <footer id="footer">
        <div className="footerInfo">
          <h5 className="footer-end">Coonect, Post and Share</h5>
          <p className="footer-end">&copy; Posting. All Rights Reserved. </p>
        </div>
      </footer>
    );
  }
};

export default Footer;