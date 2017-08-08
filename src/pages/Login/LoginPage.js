import React from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';
import { ACMECorpBlue, ACMECorpDarkBlue, ACMECorpLightgreen } from '../../colors'
import UsernameIcon from 'material-ui/svg-icons/social/person';
import PasswordIcon from 'material-ui/svg-icons/action/lock';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import Chip from 'material-ui/Chip';
import FontIcon from 'material-ui/FontIcon';
import SvgIconFace from 'material-ui/svg-icons/action/face';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const defaultUser = {
  jdoe: {
    id: 'jdoe',
    name: 'John Doe',
    organization: 'Ministry of Finance',
    password: 'test',
    avatar: '/lego_avatar_male1.jpg',
    avatar_back: '/lego_avatar_male1.jpg',
  },
  pkleffmann: {
    id: 'pkleffmann',
    name: 'Piet Kleffmann',
    organization: 'ACMECorp',
    password: 'test',
    avatar: '/lego_avatar_male5.jpg',
    avatar_back: '/lego_avatar_male5.jpg',
  },
}


const createListItems = (users, login) => {
  const items = [];
  if (users.size === 0) return items;
  let index = 0;
  for (const user in users) {
    const data = users[user];

    items.push(
      <div key={index}>
        <ListItem
          leftAvatar={<Avatar src={data.avatar} />}
          primaryText={data.name}
          secondaryText={<span>{data.organization}</span>}
          secondaryTextLines={1}
          onTouchTap={() => login({ ...data, username: user })}
        />
      </div>
    )

    index++;
  }
  return items
}


const handleEnvironmentChange = ({ value }) => {

  console.log(value)
}


const LoginPage = ({ users, login, storeUsername, storePassword, username, password, loginWithCredentails, loginUnsuccessful, environment, storeEnvironment }) => {
  return (
    <div style={{
      backgroundImage: 'url("/welcome.jpg")',
      backgroundSize: 'cover',
      width: '100%',
      height: '100%',
      position: 'absolute',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column'
    }}>
      <Card style={{
        width: '350px',
        zIndex: 1100,
        opacity: 0.9
      }}>
        <div style={{ display: 'flex', flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
          <CardTitle title="TruBudget" subtitle="A blockchain-based solution for budget expenditure" />
          <SelectField
            onChange={(event, index, value) => storeEnvironment(value)}
            floatingLabelText="Environment" value={environment}
            floatingLabelStyle={{ color: ACMECorpLightgreen }}
            style={{ width: '40%', marginRight: '8px' }}
          >
            <MenuItem value="Test" primaryText="Test" />
            <MenuItem value="Prod" primaryText="Prod" />
          </SelectField>

        </div>
        <Divider />
        <div style={{ display: 'flex', flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
          <UsernameIcon style={{ marginTop: '20px', marginRight: '20px' }} />
          <TextField
            floatingLabelStyle={{ color: ACMECorpDarkBlue }}
            underlineFocusStyle={{ borderBottomColor: ACMECorpDarkBlue }}
            floatingLabelText="Username"
            value={username}
            errorText={loginUnsuccessful ? "Incorrect username" : ""}
            onChange={(event) => storeUsername(event.target.value)}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
          <PasswordIcon style={{ marginTop: '20px', marginRight: '20px' }} />
          <TextField
            floatingLabelStyle={{ color: ACMECorpDarkBlue }}
            underlineFocusStyle={{ borderBottomColor: ACMECorpDarkBlue }}
            floatingLabelText="Password"
            value={password}
            onChange={(event) => storePassword(event.target.value)}
            errorText={loginUnsuccessful ? "Incorrect password" : ""}
            type="password"
          />
        </div>
        <div style={{ paddingTop: '10px', paddingBottom: '20px', display: 'flex', flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'center' }}>

          <RaisedButton label="Login" style={{ margin: 12 }} onTouchTap={() => loginWithCredentails(username, password)} />
        </div>
        <Divider />

        <div>
          {createListItems(defaultUser, login)}
        </div>
        <Divider />
        <CardText style={{ fontSize: '11px' }}>
          Developed by Emerging Technologies & Innovation @ Accenture
        </CardText>
      </Card>
      <img style={{
        marginTop: '40px',
        width: '200px'
      }}
        alt="Logo"
        src="/do_logo.png" />
    </div >
  )
}

export default LoginPage;
