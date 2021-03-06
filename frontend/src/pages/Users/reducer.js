import { fromJS } from "immutable";

import {
  SET_USERNAME,
  SET_PASSWORD,
  SET_ORGANIZATION,
  SET_DISPLAYNAME,
  RESET_USER,
  TAB_INDEX,
  SHOW_DASHBOARD_DIALOG,
  HIDE_DASHBOARD_DIALOG,
  FETCH_GROUPS_SUCCESS,
  GROUP_ID,
  GROUP_NAME,
  ADD_INITIAL_USER,
  REMOVE_INITIAL_USER,
  CREATE_GROUP_SUCCESS,
  LIST_GLOBAL_PERMISSIONS_SUCCESS,
} from "./actions";

const defaultState = fromJS({
  nodes: [],
  tabIndex: 0,
  dashboardDialogShown: false,
  userToAdd: {
    username: "",
    password: "",
    organization: "",
    displayName: ""
  },
  globalPermissions: {},
  editId: "",
  dialogType: "",
  groups: [],
  editDialogShown: false,
  groupToAdd: {
    groupId: "",
    name: "",
    groupUsers: []
  },
});

export default function userDashboardReducer(state = defaultState, action) {
  switch (action.type) {
    case FETCH_GROUPS_SUCCESS:
      return state.set("groups", fromJS(action.groups));
    case GROUP_ID:
      return state.setIn(["groupToAdd", "groupId"], action.groupId);
    case GROUP_NAME:
      return state.setIn(["groupToAdd", "name"], action.name);
    case ADD_INITIAL_USER:
      return state.updateIn(["groupToAdd", "groupUsers"], users => [...users, action.userId]);
    case REMOVE_INITIAL_USER:
      // Offical way to delete something from an array with immutability https://redux.js.org/recipes/structuring-reducers/immutable-update-patterns
      return state.updateIn(["groupToAdd", "groupUsers"], users => [
        ...users.slice(0, users.indexOf(action.userId)),
        ...users.slice(users.indexOf(action.userId) + 1)
      ]);
    case CREATE_GROUP_SUCCESS:
      return state.set("groupToAdd", defaultState.get("groupToAdd"));
    case SET_ORGANIZATION:
      return state.setIn(["userToAdd", "organization"], action.organization);
    case SET_DISPLAYNAME:
      return state.setIn(["userToAdd", "displayName"], action.displayName);
    case SET_USERNAME:
      return state.setIn(["userToAdd", "username"], action.username);
    case SET_PASSWORD:
      return state.setIn(["userToAdd", "password"], action.password);
    case RESET_USER:
      return state.set("userToAdd", defaultState.get("userToAdd"));
    case TAB_INDEX:
      return state.set("tabIndex", action.value);
    case SHOW_DASHBOARD_DIALOG:
      return state.merge({
        dashboardDialogShown: true,
        dialogType: action.dialogType,
        editId: action.editId
      });
    case HIDE_DASHBOARD_DIALOG:
      return state.merge({
        dashboardDialogShown: false,
        userToAdd: defaultState.get("userToAdd")
      });
    case LIST_GLOBAL_PERMISSIONS_SUCCESS:
      return state.set("globalPermissions", action.data);
    default:
      return state;
  }
}
