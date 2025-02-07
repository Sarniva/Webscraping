import puppeteer from "puppeteer";


    const getScore = async()=>{
        const browser = await puppeteer.launch({headless:false,defaultViewport:null})
    
       
            try {
                const page = await browser.newPage();
        
                
                await page.goto("https://www.fotmob.com/", { 
                    waitUntil: "networkidle0", 
                    timeout: 30000 
                });
        
        
            
            await page.waitForSelector("div.css-1lleae-CardCSS.e1mlfzv61", { timeout: 10000 });
        
            
            const scores = await page.evaluate(()=>{
            
                const scoreList = document.querySelectorAll("div.css-1lleae-CardCSS.e1mlfzv61")
                let text = ` `
        
                
        
                for(let score of scoreList){
                    const leagueNameElem = score.querySelector("div.css-170egrx-GroupTitle.effkplk0")
                    if (!leagueNameElem) continue;
                    const leagueName = leagueNameElem.textContent || "unknown league"
                    text += `${leagueName} \n`
                    const matchList = score.querySelectorAll("a.css-s4hjf6-MatchWrapper.e1ek4pst2")
                    for(let match of matchList){
                        const timeElem = match.querySelector("span.css-h4lrnf-StatusDotCSS.e1yf8uo31")
                        const team1Elem = match.querySelector(".css-9871a0-StatusAndHomeTeamWrapper.e1ek4pst4 .css-1wtw6ba-TeamName.emmmxv00")
                        const scoreElem = match.querySelector(".css-k083tz-StatusLSMatchWrapperCSS.e5pc0pz0 .css-baclne-LSMatchStatusScore.e5pc0pz2")
                        const team2Elem = match.querySelector(".css-gn249o-AwayTeamAndFollowWrapper.e1ek4pst5 .css-1wtw6ba-TeamName.emmmxv00")
        
                        if (timeElem && team1Elem && scoreElem && team2Elem) {
                            const time = timeElem.textContent || "N/A";
                            const team1 = team1Elem.textContent || "Team 1";
                            const matchScore = scoreElem.textContent || "-";
                            const team2 = team2Elem.textContent || "Team 2";
    
                            text += `${time} ${team1} ${matchScore} ${team2} \n`;
                        }
        
                    }
        
                }
        
                return text
        })
        
           
           
           console.log(scores);
            } catch (error) {
                console.error("an error occured",error)
            } finally{
                await browser.close()
            }
       
        
       
       
        
    }


getScore()