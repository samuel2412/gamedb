import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import { makeStyles } from '@material-ui/core/styles';


import GamesCard from '../../components/GamesCard/GamesCard';
import Header from '../../components/Header/Header';
import Game from '../../components/Game/Game';

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(1)
  },
}));

const LandingPage = props => {

  const classes = useStyles();
  const baseUrl = 'https://api.rawg.io/api/games?page_size=21';
  const [games, setGames] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const gta = {"id":3498,"slug":"grand-theft-auto-v","name":"Grand Theft Auto V","name_original":"Grand Theft Auto V","description":"<p>Rockstar Games went bigger, since their previous installment of the series. You get the complicated and realistic world-building from Liberty City of GTA4 in the setting of lively and diverse Los Santos, from an old fan favorite GTA San Andreas. 561 different vehicles (including every transport you can operate) and the amount is rising with every update. <br />\nSimultaneous storytelling from three unique perspectives: <br />\nFollow Michael, ex-criminal living his life of leisure away from the past, Franklin, a kid that seeks the better future, and Trevor, the exact past Michael is trying to run away from. <br />\nGTA Online will provide a lot of additional challenge even for the experienced players, coming fresh from the story mode. Now you will have other players around that can help you just as likely as ruin your mission. Every GTA mechanic up to date can be experienced by players through the unique customizable character, and community content paired with the leveling system tends to keep everyone busy and engaged.</p>","metacritic":96,"released":"2013-09-17","tba":false,"updated":"2019-10-24T00:39:04","background_image":"https://media.rawg.io/media/games/b11/b115b2bc6a5957a917bc7601f4abdda2.jpg","background_image_additional":"https://media.rawg.io/media/screenshots/5f5/5f5a38a222252d996b18962806eed707.jpg","website":"http://www.rockstargames.com/V/","rating":4.48,"rating_top":5,"ratings":[{"id":5,"title":"exceptional","count":1717,"percent":58.5},{"id":4,"title":"recommended","count":994,"percent":33.87},{"id":3,"title":"meh","count":179,"percent":6.1},{"id":1,"title":"skip","count":45,"percent":1.53}],"reactions":{"1":12,"2":2,"3":16,"4":8,"5":6,"6":3,"7":9,"8":10,"10":1,"11":6,"12":7,"14":3,"15":2,"16":4,"18":3,"20":1,"21":2},"added":10031,"added_by_status":{"yet":178,"owned":6466,"beaten":2383,"toplay":294,"dropped":402,"playing":308},"playtime":68,"screenshots_count":59,"movies_count":8,"creators_count":11,"achievements_count":369,"parent_achievements_count":75,"reddit_url":"https://www.reddit.com/r/GrandTheftAutoV/d","reddit_name":"GrandTheftAutoV: page not found","reddit_description":"/r/GrandTheftAutoV - the subreddit for all GTA V related news, content, and discussions revolving around Rockstar's critically acclaimed single player release and the ongoing multiplayer expansion of Grand Theft Auto Online.","reddit_logo":"","reddit_count":0,"twitch_count":100,"youtube_count":1000000,"reviews_text_count":24,"ratings_count":2911,"suggestions_count":403,"alternative_names":["GTA V","GTA5","GTAV"],"metacritic_url":"","parents_count":0,"additions_count":3,"game_series_count":9,"user_game":null,"reviews_count":2935,"saturated_color":"0f0f0f","dominant_color":"0f0f0f","parent_platforms":[{"platform":{"id":1,"name":"PC","slug":"pc"}},{"platform":{"id":2,"name":"PlayStation","slug":"playstation"}},{"platform":{"id":3,"name":"Xbox","slug":"xbox"}}],"platforms":[{"platform":{"id":4,"name":"PC","slug":"pc","image":null,"year_end":null,"year_start":null,"games_count":197515,"image_background":"https://media.rawg.io/media/games/088/088b41ca3f9d22163e43be07acf42304.jpg"},"released_at":"2013-09-17","requirements":{"minimum":"Minimum:OS: Windows 10 64 Bit, Windows 8.1 64 Bit, Windows 8 64 Bit, Windows 7 64 Bit Service Pack 1, Windows Vista 64 Bit Service Pack 2* (*NVIDIA video card recommended if running Vista OS)Processor: Intel Core 2 Quad CPU Q6600 @ 2.40GHz (4 CPUs) / AMD Phenom 9850 Quad-Core Processor (4 CPUs) @ 2.5GHzMemory: 4 GB RAMGraphics: NVIDIA 9800 GT 1GB / AMD HD 4870 1GB (DX 10, 10.1, 11)Storage: 72 GB available spaceSound Card: 100% DirectX 10 compatibleAdditional Notes: Over time downloadable content and programming changes will change the system requirements for this game.  Please refer to your hardware manufacturer and www.rockstargames.com/support for current compatibility information. Some system components such as mobile chipsets, integrated, and AGP graphics cards may be incompatible. Unlisted specifications may not be supported by publisher.     Other requirements:  Installation and online play requires log-in to Rockstar Games Social Club (13+) network; internet connection required for activation, online play, and periodic entitlement verification; software installations required including Rockstar Games Social Club platform, DirectX , Chromium, and Microsoft Visual C++ 2008 sp1 Redistributable Package, and authentication software that recognizes certain hardware attributes for entitlement, digital rights management, system, and other support purposes.     SINGLE USE SERIAL CODE REGISTRATION VIA INTERNET REQUIRED; REGISTRATION IS LIMITED TO ONE ROCKSTAR GAMES SOCIAL CLUB ACCOUNT (13+) PER SERIAL CODE; ONLY ONE PC LOG-IN ALLOWED PER SOCIAL CLUB ACCOUNT AT ANY TIME; SERIAL CODE(S) ARE NON-TRANSFERABLE ONCE USED; SOCIAL CLUB ACCOUNTS ARE NON-TRANSFERABLE.  Partner Requirements:  Please check the terms of service of this site before purchasing this software.","recommended":"Recommended:OS: Windows 10 64 Bit, Windows 8.1 64 Bit, Windows 8 64 Bit, Windows 7 64 Bit Service Pack 1Processor: Intel Core i5 3470 @ 3.2GHz (4 CPUs) / AMD X8 FX-8350 @ 4GHz (8 CPUs)Memory: 8 GB RAMGraphics: NVIDIA GTX 660 2GB / AMD HD 7870 2GBStorage: 72 GB available spaceSound Card: 100% DirectX 10 compatibleAdditional Notes:"}},{"platform":{"id":18,"name":"PlayStation 4","slug":"playstation4","image":null,"year_end":null,"year_start":null,"games_count":4381,"image_background":"https://media.rawg.io/media/games/588/588c6bdff3d4baf66ec36b1c05b793bf.jpg"},"released_at":"2013-09-17","requirements":null},{"platform":{"id":16,"name":"PlayStation 3","slug":"playstation3","image":null,"year_end":null,"year_start":null,"games_count":3555,"image_background":"https://media.rawg.io/media/games/ded/dedd631793c5666ffab9ef03975eb226.jpg"},"released_at":"2013-09-17","requirements":null},{"platform":{"id":14,"name":"Xbox 360","slug":"xbox360","image":null,"year_end":null,"year_start":null,"games_count":2484,"image_background":"https://media.rawg.io/media/games/328/3283617cb7d75d67257fc58339188742.jpg"},"released_at":"2013-09-17","requirements":null},{"platform":{"id":1,"name":"Xbox One","slug":"xbox-one","image":null,"year_end":null,"year_start":null,"games_count":2997,"image_background":"https://media.rawg.io/media/games/91c/91c4f377c1e09755b60a0102c5252843.jpg"},"released_at":"2013-09-17","requirements":null}],"stores":[{"id":290375,"url":"https://store.playstation.com/en-us/product/UP1004-CUSA00419_00-GTAVDIGITALDOWNL","store":{"id":3,"name":"PlayStation Store","slug":"playstation-store","domain":"store.playstation.com","games_count":6074,"image_background":"https://media.rawg.io/media/games/bc0/bc06a29ceac58652b684deefe7d56099.jpg"}},{"id":290378,"url":"https://www.microsoft.com/en-us/store/p/grand-theft-auto-v/bpj686w6s0nh?cid=msft_web_chart","store":{"id":2,"name":"Xbox Store","slug":"xbox-store","domain":"microsoft.com","games_count":2631,"image_background":"https://media.rawg.io/media/games/da1/da1b267764d77221f07a4386b6548e5a.jpg"}},{"id":290377,"url":"https://marketplace.xbox.com/en-us/product/gta-v/66acd000-77fe-1000-9115-d802545408a7","store":{"id":7,"name":"Xbox 360 Store","slug":"xbox360","domain":"marketplace.xbox.com","games_count":1758,"image_background":"https://media.rawg.io/media/games/d69/d69810315bd7e226ea2d21f9156af629.jpg"}},{"id":290376,"url":"http://store.steampowered.com/app/271590/","store":{"id":1,"name":"Steam","slug":"steam","domain":"store.steampowered.com","games_count":39749,"image_background":"https://media.rawg.io/media/games/2c4/2c4ec7b64079b561667850593d23c417.jpg"}}],"developers":[{"id":10,"name":"Rockstar Games","slug":"rockstar-games","games_count":30,"image_background":"https://media.rawg.io/media/games/e2d/e2d3f396b16dded0f841c17c9799a882.jpg"},{"id":3524,"name":"Rockstar North","slug":"rockstar-north","games_count":26,"image_background":"https://media.rawg.io/media/screenshots/f66/f66b5a94c96bc0ff7ca1ffa720500cf0.jpg"}],"genres":[{"id":4,"name":"Action","slug":"action","games_count":78568,"image_background":"https://media.rawg.io/media/games/c25/c25ebb8eb08790277ae2e2dce0d62174.jpg"},{"id":2,"name":"Shooter","slug":"shooter","games_count":22064,"image_background":"https://media.rawg.io/media/games/ebd/ebdbb7eb52bd58b0e7fa4538d9757b60.jpg"}],"tags":[{"id":40836,"name":"Full controller support","slug":"full-controller-support","language":"eng","games_count":8166,"image_background":"https://media.rawg.io/media/games/91c/91c4f377c1e09755b60a0102c5252843.jpg"},{"id":40847,"name":"Steam Achievements","slug":"steam-achievements","language":"eng","games_count":17552,"image_background":"https://media.rawg.io/media/games/148/1485f72434101885b098d4290bf0ba67.jpg"},{"id":13,"name":"Atmospheric","slug":"atmospheric","language":"eng","games_count":6941,"image_background":"https://media.rawg.io/media/games/d1a/d1a2e99ade53494c6330a0ed945fe823.jpg"},{"id":123,"name":"Comedy","slug":"comedy","language":"eng","games_count":3775,"image_background":"https://media.rawg.io/media/games/fc8/fc838d98c9b944e6a15176eabf40bee8.jpg"},{"id":18,"name":"Co-op","slug":"co-op","language":"eng","games_count":4744,"image_background":"https://media.rawg.io/media/games/55e/55ee6432ac2bf224610fa17e4c652107.jpg"},{"id":144,"name":"Crime","slug":"crime","language":"eng","games_count":1372,"image_background":"https://media.rawg.io/media/games/bd7/bd7cfccfececba1ec2b97a120a40373f.jpg"},{"id":8,"name":"First-Person","slug":"first-person","language":"eng","games_count":6154,"image_background":"https://media.rawg.io/media/games/c25/c25ebb8eb08790277ae2e2dce0d62174.jpg"},{"id":4,"name":"Funny","slug":"funny","language":"eng","games_count":7211,"image_background":"https://media.rawg.io/media/games/c98/c9839e65d2debbcbc7e0f9f76920bab8.jpg"},{"id":42,"name":"Great Soundtrack","slug":"great-soundtrack","language":"eng","games_count":2783,"image_background":"https://media.rawg.io/media/games/b8c/b8c243eaa0fbac8115e0cdccac3f91dc.jpg"},{"id":192,"name":"Mature","slug":"mature","language":"eng","games_count":541,"image_background":"https://media.rawg.io/media/games/8d6/8d69eb6c32ed6acfd75f82d532144993.jpg"},{"id":62,"name":"Moddable","slug":"moddable","language":"eng","games_count":393,"image_background":"https://media.rawg.io/media/screenshots/52a/52ab40f9426614a0eafba4ef3f9fd01c.jpg"},{"id":7,"name":"Multiplayer","slug":"multiplayer","language":"eng","games_count":18628,"image_background":"https://media.rawg.io/media/games/c80/c80bcf321da44d69b18a06c04d942662.jpg"},{"id":36,"name":"Open World","slug":"open-world","language":"eng","games_count":2391,"image_background":"https://media.rawg.io/media/games/b45/b45575f34285f2c4479c9a5f719d972e.jpg"},{"id":24,"name":"RPG","slug":"rpg","language":"eng","games_count":8976,"image_background":"https://media.rawg.io/media/games/91c/91c4f377c1e09755b60a0102c5252843.jpg"},{"id":37,"name":"Sandbox","slug":"sandbox","language":"eng","games_count":2281,"image_background":"https://media.rawg.io/media/games/1bb/1bb86c35ffa3eb0d299b01a7c65bf908.jpg"},{"id":31,"name":"Singleplayer","slug":"singleplayer","language":"eng","games_count":63192,"image_background":"https://media.rawg.io/media/games/511/5118aff5091cb3efec399c808f8c598f.jpg"},{"id":149,"name":"Third Person","slug":"third-person","language":"eng","games_count":1964,"image_background":"https://media.rawg.io/media/games/c24/c24ec439abf4a2e92f3429dfa83f7f94.jpg"},{"id":150,"name":"Third-Person Shooter","slug":"third-person-shooter","language":"eng","games_count":777,"image_background":"https://media.rawg.io/media/games/d46/d46373f39458670305704ef089387520.jpg"},{"id":411,"name":"cooperative","slug":"cooperative","language":"eng","games_count":2134,"image_background":"https://media.rawg.io/media/games/2c4/2c4ec7b64079b561667850593d23c417.jpg"}],"publishers":[{"id":2155,"name":"Rockstar Games","slug":"rockstar-games","games_count":62,"image_background":"https://media.rawg.io/media/games/4c2/4c23c4a88f53e7e482d72ddfcf5b9b41.jpg"}],"esrb_rating":{"id":4,"name":"Mature","slug":"mature"},"clip":{"clip":"https://media.rawg.io/media/stories-640/5b0/5b0cfff8c606c5e4db4f74f108c4413b.mp4","clips":{"320":"https://media.rawg.io/media/stories-320/91d/91d6b5963064a5f686f635c302095b55.mp4","640":"https://media.rawg.io/media/stories-640/5b0/5b0cfff8c606c5e4db4f74f108c4413b.mp4","full":"https://media.rawg.io/media/stories/f64/f64ce0b857918b0c202f2a5d3217848e.mp4"},"video":"dZubIhK-Z6w","preview":"https://media.rawg.io/media/stories-previews/f65/f6593df6c8df32c7f4763f9cb112a514.jpg"},"description_raw":"Rockstar Games went bigger, since their previous installment of the series. You get the complicated and realistic world-building from Liberty City of GTA4 in the setting of lively and diverse Los Santos, from an old fan favorite GTA San Andreas. 561 different vehicles (including every transport you can operate) and the amount is rising with every update. \r\nSimultaneous storytelling from three unique perspectives: \r\nFollow Michael, ex-criminal living his life of leisure away from the past, Franklin, a kid that seeks the better future, and Trevor, the exact past Michael is trying to run away from. \r\nGTA Online will provide a lot of additional challenge even for the experienced players, coming fresh from the story mode. Now you will have other players around that can help you just as likely as ruin your mission. Every GTA mechanic up to date can be experienced by players through the unique customizable character, and community content paired with the leveling system tends to keep everyone busy and engaged."}

  useEffect(() => {
   // fetchGames(baseUrl);
  }, []);

 
  const fetchGames = (url) => {
    setIsLoading(true);
    axios.get(url, {
      headers: {
        "User-Agent": "GameDB"
      }
    })
      .then((response) => {
        console.log(response);
        setGames(response.data.results);
        setPrevPage(response.data.previous)
        setNextPage(response.data.next);
        setIsLoading(false);
        scrollToTop();
      })
      .catch((err) => {
        console.log(err)
        setIsLoading(false);
      })
  }

  const nextPageHandler = () => {
    console.log('next')
    fetchGames(nextPage);
  }

  const prevPageHandler = () => {
    console.log('prev')
    fetchGames(prevPage);
  }

  const scrollToTop = () => {
    window.scroll({ top: 0, behavior: 'smooth' });
  }


  const spinner = (
    <Container maxWidth="sm" align="center">
      <CircularProgress />
    </Container>
  )

  return (
    <React.Fragment>
     
       
        <div className={classes.container}>
          {isLoading ? spinner : <Game game={gta}/>}


          
        </div>
    </React.Fragment>
  );
}

export default LandingPage;