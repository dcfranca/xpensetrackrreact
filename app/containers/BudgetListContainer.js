import React from 'react';
import BudgetList from '../components/BudgetList';
import {saveNewCategory, editBudgetItem} from '../utils/persistence';
import {yearMonthAsString, navYearMonth} from '../utils/helpers'
var PropTypes = React.PropTypes;


class BudgetListContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            year: props.year,
            month: props.month
        };
        this.handleAddCategoryClicked = this.handleAddCategoryClicked.bind(this);
        this.handleAddNewTransactionClicked = this.handleAddNewTransactionClicked.bind(this);
        this.handleSubmitCategory = this.handleSubmitCategory.bind(this);
        this.handleSubmitBudgetItem = this.handleSubmitBudgetItem.bind(this);
        this.handlePrevMonthButtonClicked = this.handlePrevMonthButtonClicked.bind(this);
        this.handleNextMonthButtonClicked = this.handleNextMonthButtonClicked.bind(this);
    }

    handlePrevMonthButtonClicked(e) {
        console.log("Prev Button Clicked");
        var obj = navYearMonth(this.state.year, this.state.month, "prev");
        this.setState({
            year: obj.year,
            month: obj.month
        })
    }

    handleNextMonthButtonClicked(e) {
        console.log("Next Button Clicked");
        var obj = navYearMonth(this.state.year, this.state.month, "next");
        this.setState({
            year: obj.year,
            month: obj.month
        })
    }

    handleAddCategoryClicked(e) {
        console.log("handleAddCategory - E: ", e);
        $('#categoryNameInput').val("");
        $('#categoryModal').modal('show');
    }

    handleSubmitCategory(e) {
        saveNewCategory(e.target.categoryName.value, e.target.isPermanent);
    }

    handleSubmitBudgetItem(e) {
        console.log("Saving Budget Item...", e);
        editBudgetItem(e.target.category.value, e.target.budget.value, yearMonthAsString(this.props.year, this.props.month));
    }

    handleAddNewTransactionClicked(e) {
        console.log("Clicked to add new transaction")
        $('#newTransactionCategory').val("");
        $('#newTransactionDescription').val("");
        $('#newTransactionModal').modal('show');
        ;
    }

    render() {
        return (
            <BudgetList
                year={this.state.year} month={this.state.month} budgetItems={this.props.budgetItems}
                onAddCategory={this.handleAddCategoryClicked}
                onAddNewTransaction={this.handleAddNewTransactionClicked}
                onSubmitCategory={this.handleSubmitCategory}
                onSubmitBudgetItem={this.handleSubmitBudgetItem}
                onPrevButtonClicked={this.handlePrevMonthButtonClicked}
                onNextButtonClicked={this.handleNextMonthButtonClicked}
            />
        );
    }
}

BudgetListContainer.contextTypes = {
  router: React.PropTypes.object.isRequired
}

BudgetListContainer.propTypes = {
  month: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  budgetItems: PropTypes.array.isRequired,
}

export default BudgetListContainer;
