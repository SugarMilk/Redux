import { connect } from 'react-redux';
import actions from './actions'
import App from './App';

const mapStateToProps = (state, ownProps) => ({
  name: state.name,
  number: state.number
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  changeName: (name) => dispatch(actions.changeName(name)),
  access: () => dispatch(actions.access())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
