import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';

class FormList extends Component {
    state = {
        products: [],
        columns: [
            {
                dataField: '_id',
                text: 'Product ID',
                sort: true
            },
            {
                dataField: 'kind_of_work',
                text: 'kind of work',
                sort: true,
            }, {
                dataField: 'service',
                text: 'Product service',
                sort: true,
            }, {
                dataField: 'engineer',
                text: 'Product engineer',
                sort: true,
            }, {
                dataField: 'customer',
                text: 'Product customer',
                sort: true,
            }, {
                dataField: 'price',
                text: 'Product Price',
                sort: true
            }]
    };

    componentDidMount() {
        fetch('/api/CarFix').then(res => res.json())
            .then(data => this.setState({products: data}))
            .catch(err => console.log("err: =" + err));
    }

    render() {
        const expandRow = {
            renderer: row => (
                <div>
                    <p>.....</p>
                    <p>You can render anything here, also you can add additional data on every row object</p>
                    <p>expandRow.renderer callback will pass the origin row object to you</p>
                </div>
            ),
            showExpandColumn: true
        };
        return (
            <div className="container" style={{ marginTop: 50 }}>
                <BootstrapTable
                    ref={ n => this.node = n }
                    keyField='id'
                    data={ this.state.products }
                    columns={ this.state.columns }
                    filter={ filterFactory() }
                    pagination={ paginationFactory() }
                    selectRow={ { mode: 'checkbox', clickToSelect: true } }
                    expandRow={ expandRow }
                    striped
                    hover

                    noDataIndication="Table is Empty"
                />
            </div>
        );
    }
}
//https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html?selectedKind=Basic%20Table&selectedStory=Indication%20For%20Empty%20Table&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel
export default FormList;
