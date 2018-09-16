import React from 'react';
import { connect } from 'react-redux'
import { Button, Col, Container, Row, Card, CardBody } from 'reactstrap'
import { api } from '~/utils/api'

class MemberDetail extends React.Component {

  state = {
    member: {},
    memberRoles: []
  }

  componentDidMount() {
    api.get('/member/detail', { params: { id: this.props.match.params.id }}).then(res => {
      this.setState({
        member: res.data.data,
        memberRoles: res.data.data.roles
      })
    })
  }

  render() {
    return (
      <React.Fragment>
        <Card style={{marginTop: '2.5%'}}>
          <div className="card-header">Detail Member</div>
          <CardBody>
            <table className="table">
              <tbody>
                <tr>
                  <th style={{width: '200px'}}>Username</th>
                  <td>{this.state.member.name}</td>
                </tr>
                <tr>
                  <th style={{width: '200px'}}>Email</th>
                  <td>{this.state.member.email}</td>
                </tr>
                <tr>
                  <th style={{width: '200px'}}>Created At</th>
                  <td>{this.state.member.created_at}</td>
                </tr>
                <tr>
                  <th style={{width: '200px'}}>Role User</th>
                  <td>
                    {
                      this.state.memberRoles.map((item) => {
                        return item.name
                      })
                    }
                  </td>
                </tr>
              </tbody>
            </table>
          </CardBody>
        </Card>
      </React.Fragment>
    )
  }
}

export default connect()(MemberDetail);