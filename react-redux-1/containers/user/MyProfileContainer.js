import { connect } from "react-redux"
import MyProfile from "../../components//MyProfile"
import myProfileAction from "../../actions/myProfileAction"
import { bindActionCreators } from 'redux';
function selectState(state) {
    //console.log(state)
    return {
        state: state.myProducts
    }
}

function buildActionDispatcher(dispatch) {
  return {
      actions: bindActionCreators(myProfileAction, dispatch)
    }
}
export default connect(
	selectState,
	buildActionDispatcher
)(MyProfile)