import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Link } from 'react-router-dom';
const { ExportCSVButton } = CSVExport;
const MyExportCSV = (props) => {
    const handleClick = () => {
        props.onExport();
    };
    return (
        <div>
            <button className="btn btn-success" onClick={ handleClick }>Export to CSV</button>
        </div>
    );
};
const selectRow = {
    mode: 'checkbox',
    clickToSelect: true
};
class FormList extends Component {

    state = {
        products: [],
        columns: [
            {
                dataField: '_id',
                text: 'Product ID',
                sort: true,
                footer: ''
            },
            {
                dataField: 'kind_of_work',
                text: 'kind of work',
                sort: true,
                footer: ''
            }, {
                dataField: 'service',
                text: 'Product service',
                sort: true,
                footer: ''
            }, {
                dataField: 'engineer',
                text: 'Product engineer',
                sort: true,
                footer: ''
            }, {
                dataField: 'price',
                text: 'Product Price',
                sort: true,
                footer: columnData => columnData.reduce((acc, item) => parseInt(acc) + parseInt(item), 0)
            }],
    };

    componentDidMount() {
        fetch('/api/carfix').then(res => res.json())
            .then(data => this.setState({products: data}))
            .catch(err => console.log("err: =" + err));
    }
    handleGetSelectedData = () => {
        console.log(this.node.selectionContext.selected);
    };
    handleDataChange = ({ dataSize }) => {
        this.setState({ rowCount: dataSize });
    };
    render() {
        return (
            <div className="container" style={{ marginTop: 50 }}>
                <div>
                    <ToolkitProvider
                        keyField="id"
                        data={ this.state.products }
                        columns={ this.state.columns }
                        exportCSV={ {
                            ignoreFooter: false
                        } }
                    >
                        {
                            props => (
                                <div>
                                    <div className='btn-group'>
                                        <Link to='/Personal'><button className="btn btn-primary">Add Row</button></Link>
                                        <MyExportCSV  { ...props.csvProps }>Export CSV!!</MyExportCSV >
                                        <button className="btn btn-secondary" onClick={ this.handleGetSelectedData }>Get Current Selected Rows</button>
                                    </div>
                                    <hr />
                                    <h5>Row Count:<span className="badge">{ this.state.rowCount }</span></h5>
                                    <BootstrapTable
                                        onDataSizeChange={ this.handleDataChange }
                                        ref={ n => this.node = n }
                                        keyField='id'
                                        data={ this.state.products }
                                        columns={ this.state.columns }
                                        filter={ filterFactory() }
                                        selectRow={ selectRow }
                                        pagination={ paginationFactory() }
                                        striped
                                        hover
                                        noDataIndication="Table is Empty"
                                    />
                                </div>
                            )
                        }
                    </ToolkitProvider>
                </div>


            </div>
        );
    }
}
//https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html?selectedKind=Basic%20Table&selectedStory=Indication%20For%20Empty%20Table&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel
export default FormList;
