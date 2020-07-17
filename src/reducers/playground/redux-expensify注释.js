import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

// ADD_EXPENSE
const addExpense = (//用这四个信息来实现增加花费 但是并不用传进去id这个属性 这几个属性同时更改 但是也设置来初始值
  {
    description = '',
    note = '',
    amount = 0,
    createdAt = 0
  } = {}
) => ({
  type: 'ADD_EXPENSE',
  expense: {
    id: uuid(),//
    description,
    note,
    amount,
    createdAt
  }
});

// REMOVE_EXPENSE
const removeExpense = ({ id } = {}) => ({//
  type: 'REMOVE_EXPENSE',
  id
});

// EDIT_EXPENSE
// SET_TEXT_FILTER
// SORT_BY_DATE
// SORT_BY_AMOUNT
// SET_START_DATE
// SET_END_DATE

// Expenses Reducer

const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return [
        ...state,//state之前的内容都放进来
        action.expense//action只有两个属性 type 和expense（json）这里要做的就是把expense推入state中
        //state: [ex1, ex2...]
      ];
    case 'REMOVE_EXPENSE':
      return state.filter(({ id }) => id !== action.id);//括号里的是{}这个东西 即list里的item 用大括号包起来 id指的是item.id
    default:
      return state;
  }
};

// Filters Reducer

const filtersReducerDefaultState = {
  text: '',
  sortBy: 'date',
  startDate: undefined,
  endDate: undefined
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

// Store creation

const store = createStore(
  combineReducers({
    expenses: expensesReducer,
//每个reducer的接口拥有自己的那部分state dispatch每次接收一个action的时候 
//dispatch会把这个action和各个reducer分管的状态传给reducer方法
//但是action往往只改变一个分状态 用type界定
//reducer看到这个type归自己管 就可以把action施加到自己分管的state上
    filters: filtersReducer
  })
);

store.subscribe(() => {
  console.log(store.getState());
});

const expenseOne = store.dispatch(addExpense({ description: 'Rent', amount: 100 }));
//dispatch接收到一个这样的json包 这个包里有两个属性type和expense
// ) => ({
//   type: 'ADD_EXPENSE',
//   expense: {
//     id: uuid(),//
//     description,
//     note,
//     amount,
//     createdAt
//   }
//
const expenseTwo = store.dispatch(addExpense({ description: 'Coffee', amount: 300 }));

store.dispatch(removeExpense({ id: expenseOne.expense.id }));

// const demoState = {
//   expenses: [{
//     id: 'poijasdfhwer',
//     description: 'January Rent',
//     note: 'This was the final payment for that address',
//     amount: 54500,
//     createdAt: 0
//   }],
//   filters: {
//     text: 'rent',
//     sortBy: 'amount', // date or amount
//     startDate: undefined,
//     endDate: undefined
//   }
// };

