import * as React from 'react';
import { connect, DispatchProp, MapDispatchToProps, MapStateToProps } from 'react-redux';

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
                actions={this.props.actions}
              />
            )
          }
        </ThemeContext.Consumer>
      </div>
    );
  }
}


function mapStateToProps(state: any, ownProps: any) {
  return {
    roleDefs: state.getRoleList.data
  };
}

const mapDispatchToProps: MapDispatchToProps<any, any> = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RoleDefComponent)