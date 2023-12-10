import React from "react";
import {
  Button,
  Image,
  Icon,
  Container,
  Segment,
  Grid,
  Header,
  List,
  Popup,
  Menu,
} from "semantic-ui-react";

const SetupPage = ({ showTooltip = true }) => {
  const content = "You can only request a setup if you have an account";

  return (
    <div className="container" style={{ width: "100%" }}>
      <Segment vertical style={{ backgroundColor: "#292929" }}>
        <Menu style={{ backgroundColor: "#292929" }}>
          <Menu.Item>
            <Button style={{ marginLeft: "10px" }} as="a">
              Log in
            </Button>
            <Button as="a" primary style={{ marginLeft: "10px" }}>
              Sign up
            </Button>
          </Menu.Item>
          <Menu.Item position="right" style={{ backgroundColor: "#292929" }}>
            <Image src="/WebsiteLogo.png" spaced="left" />
          </Menu.Item>
        </Menu>
      </Segment>
      <Segment
        vertical
        style={{
          backgroundColor: "##ebebeb",
          textAlign: "center",
          width: "100%",
        }}
      >
        {showTooltip ? (
          <Popup
            content={content}
            on="hover"
            trigger={
              <Button as="a" primary style={{ marginLeft: "10px" }} size="huge">
                Request a setup >
              </Button>
            }
          />
        ) : (
          <Button as="a" primary style={{ marginLeft: "10px" }} size="huge">
            Request a setup >
          </Button>
        )}
      </Segment>
      <Segment vertical style={{ height: "1080px" }}>
        <Header as="h1">Setups area</Header>
      </Segment>
      <Segment inverted vertical style={{ padding: "5em", margin: "0px" }}>
        <div>
          <Grid divided inverted stackable>
            <Grid.Row>
              <Grid.Column width={3}>
                <Header inverted as="h4" content="About" />
                <List link inverted>
                  <List.Item as="a">
                    <Icon name="mail"></Icon> msimracinglabs@gmail.com
                  </List.Item>
                  <List.Item as="a">
                    <Icon name="youtube"></Icon> mas simlabs
                  </List.Item>
                  <List.Item as="a">
                    <Icon name="discord"></Icon> discord
                  </List.Item>
                </List>
              </Grid.Column>
              <Grid.Column width={3}>
                <Header inverted as="h4" content="Links" />
                <List link inverted>
                  <List.Item as="a">Terms and conditions</List.Item>
                  <List.Item as="a">Privacy policy</List.Item>
                </List>
              </Grid.Column>
              <Grid.Column width={7}>
                <Header as="h4" inverted>
                  © 2023 Copyright: mas-simlabs.com
                </Header>
                <p>
                  mas-simlabs is a project aiming to share hardware and software
                  simracing content. And to contribute to the simracing
                  community by making this hobby more accessible to a broader
                  public.{" "}
                </p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </Segment>
    </div>
  );
};

export default SetupPage;
