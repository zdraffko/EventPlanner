import React, { Fragment } from "react";
import { Segment, Header, Form, Button, Comment } from "semantic-ui-react";
import { observer } from "mobx-react-lite";

const EventDetailsComments = () => (
  <Fragment>
    <Segment textAlign="center" attached="top" inverted color="orange" style={{ border: "none" }}>
      <Header>Leave a comment about this event</Header>
    </Segment>
    <Segment attached>
      <Comment.Group>
        <Comment>
          <Comment.Avatar src="/assets/user.png" />
          <Comment.Content>
            <Comment.Author as="a">User</Comment.Author>
            <Comment.Metadata>
              <div>Today at 17:40</div>
            </Comment.Metadata>
            <Comment.Text>I am going</Comment.Text>
            <Comment.Actions>
              <Comment.Action>Reply</Comment.Action>
            </Comment.Actions>
          </Comment.Content>
        </Comment>

        <Form reply>
          <Form.TextArea />
          <Button content="Add Reply" labelPosition="left" icon="edit" primary />
        </Form>
      </Comment.Group>
    </Segment>
  </Fragment>
);

export default observer(EventDetailsComments);
