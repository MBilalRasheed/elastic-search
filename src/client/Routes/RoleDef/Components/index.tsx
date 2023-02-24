import * as React from 'react';
import { connect } from 'react-redux';

import { ThemeContext } from '../../../Context';
import RoleListComponent from './RoleList';
import * as actions from '../../../Actions/roleAction'
import { bindActionCreators } from 'redux';
/**
 * Root component which calls the list component to show the existing role list
 * Then list component calls different other components like create, members, etc
 * @extends React.Component
 */
class RoleDefComponent extends React.Component<any> {
  /**
   * Render the component to the DOM
   * @returns {}
   */


  componentDidMount(): void {
    this.props.actions.getRoleList()
  }
  render() {
    const { roleDefs } = this.props;
    return (
      <div>
        <ThemeContext.Consumer>
          {
            theme => (
              <RoleListComponent
                theme={theme}
                roleDefs={(roleDefs && roleDefs.length > 0) ? roleDefs : []}
              />
            )
          }
        </ThemeContext.Consumer>
      </div>
    );
  }
}


function mapStateToProps(state: any, ownProps:any) {

  return {
    roleDefs: state.getRoleList.data
  };
}
// const  RoleListComponentWithRedux= connect(mapStateToProps)themr(ROLE, baseTheme)(RoleListComponent) as ThemedComponentClass<RoleListProp, RoleListState>;
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RoleDefComponent)