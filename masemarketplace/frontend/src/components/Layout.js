import React, {useState} from 'react'
import {
  Button,
  Checkbox,
  Grid,
  Header,
  Icon,
  Image,
  Menu,
  Segment,
  Sidebar,
  Dropdown
} from 'semantic-ui-react'

import { FaAlignJustify, 
        FaCloudsmith, 
        FaProjectDiagram,
        FaUsers,
        FaDocker,
        FaCube,
        FaUserAlt,
        FaSignOutAlt,
        FaUndo,
        FaRegStopCircle}
         from 'react-icons/fa';




export default function SidebarExampleSidebar() {
  const [visible, setVisible] = React.useState(false)
  const PrimaryButton={backgroundColor:"#6567a5", color:"#ffffff"}

  const options = [
    { key: 'logout', text: 'Logout', value: 'logout',  icon: 'edit' },
    { key: 'restart', text: 'Restart', value: 'restart' },
    { key: 'shutdown', text: 'Shutdown', value: 'shutdown' },
  ]

  return (
    <div >
    <Grid columns={1} style={{backgoundColor:"black"}}>
      <Grid.Column style={{ height: "105vh" }}>
        <Sidebar.Pushable>
          <Sidebar
            as={Menu}
            animation='scale down'
            icon='labeled'
            inverted
            onHide={() => setVisible(false)}
            vertical
            visible={visible}
            width='large'
            style={{backgroundColor:"#6567a5"}}
          >
            <h3 style={{color:'white', marginTop:'10px'}}>
              <FaCube style={{marginRight:'10px'}}/>
              openMES BETA</h3>
            <Menu.Item as='a'>
            <FaCloudsmith style={{marginRight:'10px'}}/>
              Applications
            </Menu.Item>
            <Menu.Item as='a'>
              <FaProjectDiagram style={{marginRight:'10px'}}/>
              Utilities
            </Menu.Item>
            <Menu.Item as='a'>
              <FaUsers style={{marginRight:'10px'}}/>
              User management
            </Menu.Item>
            <Button style={{position:'absolute', bottom:'60px', width:'80%', left:'9%'}}>
              <FaDocker style={{marginRight:'10px'}}/>
                  Pull latest version
            </Button>
          </Sidebar>

          <Sidebar.Pusher >
            
            <Segment inverted>
              <Menu secondary inverted>
                <Menu.Menu position='left'>
                  <Button onClick={() => setVisible(!visible)} style={PrimaryButton}>
                  <FaAlignJustify/>
                  </Button>
                </Menu.Menu>
                <Menu.Menu position='right'>
                <Button.Group >
                  <Button style={PrimaryButton}>
                    <FaUserAlt/>
                  </Button>
                  <Dropdown
                    style={PrimaryButton}
                    className='button icon'
                    floating
                    trigger={<></>}
                  >
                    <Dropdown.Menu>
                      <Dropdown.Item ><FaSignOutAlt/> Logout</Dropdown.Item>
                      <Dropdown.Item ><FaUndo/> Restart</Dropdown.Item>
                      <Dropdown.Item ><FaRegStopCircle/> Shutdown</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Button.Group>
                </Menu.Menu>
              </Menu>
            </Segment>

              <Header as="h3">Application Content</Header>

          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Grid.Column>
    </Grid>
    </div>
  )
}
