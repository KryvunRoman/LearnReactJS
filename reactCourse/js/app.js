var my_news = [
  {
    author: 'Саша Печкин',
    text: 'В четчерг, четвертого числа...',
    bigText: 'в четыре с четвертью часа четыре чёрненьких чумазеньких чертёнка чертили чёрными чернилами чертёж.'
  },
  {
    author: 'Просто Вася',
    text: 'Считаю, что $ должен стоить 35 рублей!',
    bigText: 'А евро 42!'
  },
  {
    author: 'Гость',
    text: 'Бесплатно. Скачать. Лучший сайт - http://localhost:3000',
    bigText: 'На самом деле платно, просто нужно прочитать очень длинное лицензионное соглашение'
  }
];

var Article = React.createClass({
    propTypes: {
        data: React.PropTypes.shape({
            author: React.PropTypes.string.isRequired,
            text: React.PropTypes.string.isRequired,
            bigText: React.PropTypes.string.isRequired
        })
    },
    getInitialState: function() {
        return {
            visible: false
        };
    },
    readmoreClick: function(e) {
        e.preventDefault();
        this.setState({visible: true}, function() {
          console.log('Состояние изменилось');
        });
    },
    render: function(){
        var author = this.props.data.author,
        text = this.props.data.text,
        bigText = this.props.data.bigText,
        visible = this.state.visible;
        
        console.log('render',this); //добавили console.log
        
        return(
            <div className="article">
                <p className="news__author">{author}:</p>
                <p className="news__text">{text}</p>
                
                <a href="javascript:void(0)" 
                    onClick={this.readmoreClick} 
                    className={'news__readmore ' + (visible ? 'none': '')}>
                    Подробнее
                </a>
                <p className={'news__big-text ' + (visible ? '': 'none')}>{bigText}</p>
            </div>
        );
    }
});

var Add = React.createClass({
  getInitialState: function() { //устанавливаем начальное состояние (state)
    return {
      agreeNotChecked: true,
      authorIsEmpty: true,
      textIsEmpty: true
    };
  },
  componentDidMount: function() {
    ReactDOM.findDOMNode(this.refs.author).focus();
  },
  onBtnClickHandler: function(e) {
    e.preventDefault();
    var author = ReactDOM.findDOMNode(this.refs.author).value;
    var text = ReactDOM.findDOMNode(this.refs.text).value;
    alert(author + '\n' + text);
  },
  onCheckRuleClick: function(e) {
    this.setState({agreeNotChecked: !this.state.agreeNotChecked}); //устанавливаем значение в state
  },
  onAuthorChange: function(e) {
    if (e.target.value.trim().length > 0) {
      this.setState({authorIsEmpty: false})
    } else {
      this.setState({authorIsEmpty: true})
    }
  },
  onTextChange: function(e) {
    if (e.target.value.trim().length > 0) {
      this.setState({textIsEmpty: false})
    } else {
      this.setState({textIsEmpty: true})
    }
  },
  onFieldChange: function(fieldName, e) {
    if (e.target.value.trim().length > 0) {
      this.setState({[''+fieldName]: false})
    } else {
      this.setState({[''+fieldName]: true})
    }
  },
  render: function() {
    var agreeNotChecked = this.state.agreeNotChecked,
        authorIsEmpty = this.state.authorIsEmpty,
        textIsEmpty = this.state.textIsEmpty;
    return (
      <form className='add cf'>
        <input
          type='text'
          className='add__author'
          onChange={this.onFieldChange.bind(this, 'authorIsEmpty')}
          placeholder='Ваше имя'
          ref='author'
        />
        <textarea
          className='add__text'
          onChange={this.onFieldChange.bind(this, 'textIsEmpty')}
          placeholder='Текст новости'
          ref='text'
        ></textarea>
        <label className='add__checkrule'>
          <input type='checkbox' ref='checkrule' onChange={this.onCheckRuleClick}/>Я согласен с правилами
        </label>

        <button
          className='add__btn'
          onClick={this.onBtnClickHandler}
          ref='alert_button'
          disabled={agreeNotChecked || authorIsEmpty || textIsEmpty}
          >
          Показать alert
        </button>
      </form>
    );
  }
});
    
var News = React.createClass({
    xpropTypes: {
        data: React.PropTypes.array.isRequired
    },
    getInitialState: function(){
        return {
            counter: 0
        };
    },
    render: function() {
        var data = this.props.data;
        var newsTemplate;

        if (data.length > 0) {
            newsTemplate = data.map(function(item, index) {
                return (
                    <div key={index}>
                        <Article data={item} />
                    </div>
                )
            })
        } else {
            newsTemplate = <p>К сожалению новостей нет</p>
        }

        return (
            <div className="news">
                {newsTemplate}
                <strong 
                    className={'news__count ' + (data.length > 0 ? '':'none') }>
                    Всего новостей: {data.length}
                 </strong>
                <hr />
            </div>
        );
    }
});

var ControlledInput = React.createClass({
    getInitialState: function(){
        return {
            fieldValue: ''
        }
    },
    onChangeHandler: function(e){
        this.setState({fieldValue: e.target.value});
    },
    onBtnClickHandler: function(){
        alert(this.state.fieldValue);
    },
    render: function(){
        return (
            <div>
                <input type="text" className='test-input' 
                    value={this.state.fieldValue} 
                    onChange={this.onChangeHandler} 
                    placeholder='введите значение'
                />
                <button type="button" onClick={this.onBtnClickHandler}>
                    Показать alert
                </button>
            </div>
        );
    }
});

var UncontrolledInput = React.createClass({
    onBtnClickHandler: function() {
        console.log(this.refs);
        alert(ReactDOM.findDOMNode(this.refs.myTestInput).value);
    },
    componentDidMount: function(){
        ReactDOM.findDOMNode(this.refs.myTestInput).focus();
    },
    componentWillReceiveProps: function(nextProps) {
        this.setState({
            likesIncreasing: nextProps.likeCount > this.props.likeCount
        });
    },
    render: function() {
        return (
            <div>
                <input
                  className='test-input'
                  defaultValue=''
                  placeholder='введите значение'
                  ref='myTestInput'
                />
                <button type="button" onClick={this.onBtnClickHandler} ref='alert_button'>
                    Показать Uncontroll alert
                </button>
            </div>
        );
    }
});

var App = React.createClass({
    render: function() {
        return (
            <div className="app">
            <h3>Новости</h3>
            <Add />  {/* добавили вывод компонента */}
            <News data = {my_news} /> {/* удалили data = {my_news} */}
            </div>
        );
    }
});

ReactDOM.render(
  <App />,
  document.getElementById('root')
);