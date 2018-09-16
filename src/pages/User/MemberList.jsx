import React from 'react'
import ReactTable from 'react-table'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button, Col, Container, Row, Card, CardBody } from 'reactstrap'
import { api } from '~/utils/api'

import 'react-table/react-table.css'

class MemberList extends React.Component {

  state = {
    items: []
  }

  async componentDidMount() {
    await api.get(this.props.apiPath).then(res => {
      this.setState({
        items: res.data.items.map(item => {
          return item.data
        })
      })
    })
  }

  async reloadDataList(state, instance) {
    await api.get(this.props.apiPath).then(res => {
      this.setState({
        items: res.data.items.map(item => {
          return item.data
        })
      })
    })
  }

  render() {
    return (
      <React.Fragment>
        <Card style={{marginTop: '2.5%'}}>
          <div className="card-header">List Member</div>
          <CardBody>
            <div className='table-responsive'>
              <ReactTable
                data={this.state.items}
                columns={this.props.tableColumns}
                defaultPageSize={10}
                onFetchData={this.reloadDataList.bind(this)}
                resizable={false}
              />
            </div>
          </CardBody>
        </Card>
      </React.Fragment>
    )
  }
}

MemberList.propTypes = {
  children: PropTypes.node,
  apiPath: PropTypes.string,
  tableColumns: PropTypes.array
}

MemberList.defaultProps = {
  apiPath: '/member/index',
  tableColumns: [
    {
      Header: '',
      id: 'row-index',
      filterable: false,
      sortable: false,
      maxWidth: 50,
      accessor: d => d.index,
      Cell: (row) => {
        return row.index+1
      }
    },
    {
      Header: props => <b style={{textAlign: 'left', margin: '0px', display: 'block'}}>Username</b>,
      accessor: 'name'
    },
    {
      Header: props => <b style={{textAlign: 'left', margin: '0px', display: 'block'}}>Email</b>,
      accessor: 'email'
    },
    {
      Header: props => <b style={{textAlign: 'left', margin: '0px', display: 'block'}}>Created At</b>,
      accessor: 'created_at'
    },
    {
      Header: props => <b style={{textAlign: 'left', margin: '0px', display: 'block'}}>Status</b>,
      accessor: 'status',
      Cell: (row) => {
        return row.value == 1 ? 'Active' : 'Not Active'
      }
    }
  ]
}

export default connect()(MemberList)