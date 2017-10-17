/**
 * ailife   导航
 *
 */

import React from 'react';
import {StackNavigator, TabNavigator} from 'react-navigation';

import {COLOR,SYSTEM} from './config';
import * as components from './components';

/*
tab四个主页面
 */
import NewsMain from './pages/news/NewsMain';
import MovieMain from './pages/movies/MovieMain';
import ExpressMain from './pages/express/ExpressMain';
import Mine from './pages/mine/Mine';

/**
 * 其他页面
 */
import WebView from './pages/webView';

/***快递模块****/
import SearchExpress from './pages/express/SearchExpress';
import SearchDetail from './pages/express/SearchDetail';
import RemarkName from './pages/express/RemarkName';
import QRCodePage from './pages/express/QRCodePage';
import CodeShippersPage from './pages/express/CodeShippersPage';
import QRCodeResult from './pages/express/QRCodeResult';

/****电影模块*****/
import MovieHotLine from './pages/movies/MovieHotLine';
import DouBanRank from './pages/movies/DouBanRank';
import MovieComingsoon from './pages/movies/MovieComingsoon';
import MovieDetail from './pages/movies/MovieDetail';
import MoviePeopleInfo from './pages/movies/MoviePeopleInfo';
import MovieSearchList from './pages/movies/MovieSearchList';

/****我的模块*****/
import ExpressCollect from './pages/mine/ExpressCollect';
import Video from './pages/mine/Video';
import Picture from './pages/mine/Picture';
import About from './pages/mine/About';
import MovieCollect from './pages/mine/MovieCollect';

const TabOptions = (tabBarTitle,iconName,navTitle) => {

  const tabBarLabel= tabBarTitle;
  const tabBarIcon = (({tintColor,focused}) =>{
    return(
      <components.Icon
                  name={iconName}
                  style={{color: tintColor, fontSize: 25}}
                />
    )
  });
  const headerStyle={backgroundColor:'white'};
  const headerTitle = navTitle;
  const headerTitleStyle = {fontSize:18,color:'black',alignSelf:'center'}
  const tabBarVisible = true;
  return {tabBarLabel,tabBarIcon,headerTitle,headerTitleStyle,headerStyle,tabBarVisible};
}

const StackOptions = ({navigation}) => {
  let { state,goBack } = navigation;
  const headerStyle = {backgroundColor:'white'};
  const headerTitle = state.params.title;
  const headerTitleStyle = {fontSize:18 ,color:'black',alignSelf:'center'}
  const headerBackTitleStyle={color:'black',fontSize:16}
  const headerTintColor = 'black'
  const headerBackTitle = '返回'
  let header;
  if (state.params.isVisible === false) {
    header = null;
  }
  return {headerStyle,headerTitle,headerTitleStyle,header,headerBackTitleStyle,headerTintColor,headerBackTitle}
}

const NewsStack = StackNavigator({
  News:{
    screen:NewsMain,
    navigationOptions:() => TabOptions('新闻','description','新闻'),
  }
},
{
  mode:'modal'

});

const MovieStack = StackNavigator({
  Movie:{
    screen:MovieMain,
    navigationOptions:() => TabOptions('电影','movie-filter','电影'),
  }
},
{
  mode:'modal'

}
);

const ExpressStack = StackNavigator({
  Express:{
    screen:ExpressMain,
    navigationOptions:() => TabOptions('快递','local-shipping','快递'),
  }
},
{
  mode:'modal'

}
);

const MineStack = StackNavigator({
  Mine:{
    screen:Mine,
    navigationOptions:() => TabOptions('我的','account-circle','我的'),
  }
},
{
  mode:'modal'

}
);

const MyTab = TabNavigator({
  NewsStack:{
    screen:NewsStack,
    navigationOptions:{
      header:null
    }
  },
  MovieStack:{
    screen:MovieStack,
    navigationOptions:{
      header:null
    }
  },
  ExpressStack:{
    screen:ExpressStack,
    navigationOptions:{
      header:null
    }
  },
  MineStack:{
    screen:MineStack,
    navigationOptions:{
      header:null
    }
  },

},
{
  tabBarOptions:'bottom',
  swipeEnabled:false,
  animationEnabled:false,
  backBehavior:'none',
  lazy:true,
  tabBarOptions:{
      iconStyle:{
        height:22,
        width:22,
        margin:0
      },
      style:{
        height:49,
      },
      labelStyle: {
       fontSize: 12,
     },
      activeBackgroundColor:'white',
      activeTintColor:COLOR.theme,
      // label和icon的背景色 不活跃状态下
      inactiveBackgroundColor:'white',
        // label和icon的前景色 不活跃状态下(未选中)
      inactiveTintColor:'#aaa',
      showIcon:true,
      showLabel:true,
      pressOpacity:0.3,
      indicatorStyle:{
        height:0
      },
    }

})

const AppNavigator = StackNavigator({
  MyTab:{
    screen:MyTab
  },
  WebView:{
    screen:WebView,
    navigationOptions:({navigation}) => StackOptions({navigation})
  },
  SearchExpress:{
    screen:SearchExpress,
    navigationOptions:({navigation}) => StackOptions({navigation})
  },
  SearchDetail:{
    screen:SearchDetail,
    navigationOptions:({navigation}) => StackOptions({navigation})
  },
  RemarkName:{
    screen:RemarkName,
    navigationOptions:({navigation}) => StackOptions({navigation})
  },
  QRCodePage:{
    screen:QRCodePage,
    navigationOptions:({navigation}) => StackOptions({navigation})
  },
  CodeShippersPage:{
    screen:CodeShippersPage,
    navigationOptions:({navigation}) => StackOptions({navigation})
  },
  QRCodeResult:{
    screen:QRCodeResult,
    navigationOptions:({navigation}) => StackOptions({navigation})
  },
  MovieHotLine:{
    screen:MovieHotLine,
    navigationOptions:({navigation}) => StackOptions({navigation})
  },
  DouBanRank:{
    screen:DouBanRank,
    navigationOptions:({navigation}) => StackOptions({navigation})
  },
  MovieComingsoon:{
    screen:MovieComingsoon,
    navigationOptions:({navigation}) => StackOptions({navigation})
  },
  MovieDetail:{
    screen:MovieDetail,
    navigationOptions:({navigation}) => StackOptions({navigation})
  },
  MoviePeopleInfo:{
    screen:MoviePeopleInfo,
    navigationOptions:({navigation}) => StackOptions({navigation})
  },
  MovieSearchList:{
    screen:MovieSearchList,
    navigationOptions:({navigation}) => StackOptions({navigation})
  },
  ExpressCollect:{
    screen:ExpressCollect,
    navigationOptions:({navigation}) => StackOptions({navigation})
  },
  Video:{
    screen:Video,
    navigationOptions:({navigation}) => StackOptions({navigation})
  },
  Picture:{
    screen:Picture,
    navigationOptions:({navigation}) => StackOptions({navigation})
  },
  MovieCollect:{
    screen:MovieCollect,
    navigationOptions:({navigation}) => StackOptions({navigation})
  },
  About:{
    screen:About,
    navigationOptions:({navigation}) => StackOptions({navigation})
  },
},
  {
     headerMode:'screen',
    // transitionConfig:()=>({
    //   screenInterpolator:CardStackStyleInterpolator.forHorizontal,
    // })
});

export default AppNavigator;
