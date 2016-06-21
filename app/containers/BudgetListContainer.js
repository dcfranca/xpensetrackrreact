import React from 'react';
import BudgetList from '../components/BudgetList'

class BudgetListContainer extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {
    }

    render() {
        return (
            <BudgetList year={this.props.year} month={this.props.month} budgetItems={this.props.budgetItems} />
        );
    }
}

BudgetListContainer.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default BudgetListContainer;