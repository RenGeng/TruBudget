import React from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,
} from 'material-ui/Table';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import _ from 'lodash';

import { ACMECorpDarkBlue } from '../../colors';
import { showRolesDialog } from './actions';
import RolesDialog from './RolesDialog';

const styles = {
  tableWrapper: {
    width: '100%',
    height: '700px',
    overflow: 'auto'
  },
  actionButton: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    alignItems: 'center',
    top: '16px',
    right: '-26px'
  }
}

const getRoles = (roles) => {

  return roles.map(role => {
    return (
      <TableRow key={ role.role }>
        <TableRowColumn>
          { role.organization }
        </TableRowColumn>
        <TableRowColumn>
          { role.role }
        </TableRowColumn>
        <TableRowColumn>missing</TableRowColumn>
        <TableRowColumn>missing</TableRowColumn>
        <TableRowColumn>missing</TableRowColumn>
      </TableRow>
    )
  })

}


const RolesTable = (props) => {
  const {roles, showRolesDialog} = props
  const tableEntries = getRoles(roles)
  return (
    <div style={ styles.tableWrapper }>
      <Table selectable={ false }>
        <TableHeader displaySelectAll={ false } adjustForCheckbox={ false }>
          <TableRow>
            <TableHeaderColumn>Organization</TableHeaderColumn>
            <TableHeaderColumn>ID</TableHeaderColumn>
            <TableHeaderColumn>Read</TableHeaderColumn>
            <TableHeaderColumn>Write</TableHeaderColumn>
            <TableHeaderColumn>Admin</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={ false } adjustForCheckbox={ false }>
          { tableEntries }
        </TableBody>
      </Table>
      <div style={ styles.actionButton }>
        <FloatingActionButton style={ { position: 'relative' } } backgroundColor={ ACMECorpDarkBlue } onTouchTap={ () => showRolesDialog() }>
          <ContentAdd />
        </FloatingActionButton>
      </div>
      <RolesDialog {...props}/>
    </div>
  )
}

export default RolesTable;