import Vue from 'vue'
import moment from 'moment-timezone';
import store from '@/store';

import * as _ from 'underscore';

import bootstrapCss from "!!raw-loader!@/styles/bootstrapMIN.css";

Vue.filter('truncate-text', function (text: string, stop: number) {
	if(text){
		return (stop < text.length) ? text.slice(0, stop) + '...' : text
	}
	else
		return ''
})

Vue.filter('beautify-time-am-pm', function(time){
	if(time){
		const hh = Number(time.substr(0,2))
		const ampm = hh>12?' PM':' AM'
		const HH = hh>12? hh-12 : hh 
		return HH+time.substr(2,3) +ampm	
	}else
		return ''
})

Vue.filter('capitalize', function(str: string){
	
	if(str)
		return str.charAt(0).toUpperCase() + (str.slice(1)).toLowerCase();
	else
		return ''
	
})

Vue.filter('capitalizefirst', function(str: string){
	
	if(str)
		return str.charAt(0).toUpperCase() + (str.slice(1));
	else
		return ''
	
})

Vue.filter('beautify-date-mm-dd-yyyy', function(date){
	enum MonthList {'Jan' = 1, 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'}
	if(date)
		return date.substr(8,2) + ' ' + MonthList[Number(date.substr(5,2))] + ' ' + date.substr(0,4);
	else
		return ''
})

Vue.filter('beautify-date-dd/mm/yyyy', function(date){
	
	if(date)
		return date.substr(8,2) + '/' + date.substr(5,2) + '/' + date.substr(0,4);
	else
		return ''
})

Vue.filter('beautify-date', function(date){
	enum MonthList {'Jan' = 1, 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'}
	if(date)
		return MonthList[Number(date.substr(5,2))] + ' ' +date.substr(8,2) + ' ' +  date.substr(0,4);
	else
		return 'unknown'
})

Vue.filter('beautify-date-month', function(date){
	enum MonthList {'January' = 1, 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'}
	if(date)
		return MonthList[Number(date.substr(5,2))] + ' ' +date.substr(8,2) + ', ' +  date.substr(0,4);
	else
		return 'unknown'
})

Vue.filter('beautify-date-month-year', function(date){
	enum MonthList {'January' = 1, 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'}
	
	if(date){

		let dayText = '';
		const dayFirstDigit = Number(date.substr(8,1));		
		const daySecondDigit = Number(date.substr(9,1));
		
		if (daySecondDigit == 1){
			dayText = 'st';
		} else if (daySecondDigit == 3){
			dayText = 'rd';
		} else {
			dayText = 'th';
		}

		const dayName = (dayFirstDigit == 0)?(daySecondDigit + dayText):(Number(date.substr(8,2)) + dayText);

		return dayName + ' day of ' + MonthList[Number(date.substr(5,2))] + ', ' +  date.substr(0,4);
	}
	else
		return 'unknown'
})

Vue.filter('get-submission-fullname', function(names){
	const fullnames = []
	for(const name of names){
		     if(name=='form2') fullnames.push("Notice of Appearance")
		else if(name=='form7') fullnames.push("Notice of Appeal")
	}
	return fullnames
})

Vue.filter('beautify-time', function(time){	
	if(time)
		return time.substr(11,2) + ':' +  time.substr(14,2);
	else
		return ''
})

Vue.filter('convert-time24to12', function(time) {
    const time12 = (Number(time.substr(0,2)) % 12 || 12 ) + time.substr(2,3)
    
    if (Number(time.substr(0,2))<12) {
      return time12 +' AM'
    } else {
      return time12 +' PM'
    }  
})

Vue.filter('beautify-date-blank', function(date){
	enum MonthList {'Jan' = 1, 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'}
	if(date)
		return MonthList[Number(date.substr(5,2))] + ' ' +date.substr(8,2) + ' ' +  date.substr(0,4);
	else
		return ' '
})

Vue.filter('beautify-date-weekday', function(date){
	if(date)
		return	moment(date).format('ddd MMM DD, YYYY HH:mm');
	else
		return ''
})

Vue.filter('beautify-date-weekday-nohr', function(date){
	if(date)
		return	moment(date).format('ddd MMM DD, YYYY');
	else
		return ''
})

Vue.filter('scrollToLocation', function(locationName){
	if(locationName){
		Vue.nextTick(()=>{
			const el = document.getElementsByName(locationName)
			if(el[0]) el[0].scrollIntoView();
		})
	}
})

Vue.filter('styleTitle',function(title){
	return "<div style='display:inline; color:#29877c'>" + title + "</div>"
})

Vue.filter('getFullName',function(first, last){	

	const firstName = first? first+' ': '' 
	const lastName = last? last+' ': '' 		
	return firstName+lastName	
})

Vue.filter('getFullAddress',function(nameObject){

	if (nameObject && Object.keys(nameObject).length) {
		return 	(nameObject.street?(nameObject.street +", "):'') +
				(nameObject.city?(nameObject.city +", "):'') +
				(nameObject.state?(nameObject.state +", "):'') +
				(nameObject.country?(nameObject.country +", "):'') +
				(nameObject.postcode?(nameObject.postcode ):' ');
	} else{
		return " "
	}
})

Vue.filter('getFullContactInfo',function(nameObject){
	const pre = "<div style='display:inline; color:#10669c'>"
	const post = "</div>"
	if (nameObject && Object.keys(nameObject).length) {
		return pre+"Phone: "+post+
			(nameObject.phone? nameObject.phone:' - ') +
			" "+pre+"Email: "+post+
			(nameObject.email? nameObject.email:' - ');			
	} else{
		return " "
	}
})

Vue.filter('setSurveyProgress', function(survey, currentStep: number, currentPage: number, defaultProgress: number, beforeDestroy: boolean){

	let progress =  defaultProgress;

	if(survey && store.state.Application.steps[currentStep].pages[currentPage].progress)
		progress = survey.isCurrentPageHasErrors? 50 : 100;

	store.commit("Application/setPageProgress", { currentStep: currentStep, currentPage:currentPage, progress:progress });

})

Vue.filter('setProgressForPages', function(currentStep: number, pageNumbers: number[], progress: number){
	for (const page of pageNumbers)
		if(store.state.Application.steps[currentStep].pages[page].progress)
			store.commit("Application/setPageProgress", { currentStep: currentStep, currentPage:page, progress:progress });
})

Vue.filter('printPdf', function(html, pageFooterLeft, pageFooterRight){

	const body = 
		`<!DOCTYPE html>
		<html lang="en">
		<head>		
		<meta charset="UTF-8">
		<title>Court Of Appeal</title>`+
		`<style>`+
			`@page {
				size: 8.5in 11in !important;
				margin: .7in 0.7in 0.9in 0.7in !important;
				font-size: 10pt !important;			
				@bottom-left {
					content: `+pageFooterLeft+`;
					white-space: pre;
					font-size: 7pt;
					color: #606060;
				}
				@bottom-right {
					content:`+pageFooterRight+` "  Page " counter(page) " of " counter(pages);
					font-size: 7pt;
					color: #606060;
				}
			}`+
			`@media print{
				.new-page{
					page-break-before: always;
					position: relative; top: 8em;
				}
				section{
					page-break-inside: avoid;
				}
				.print-block{
					page-break-inside: avoid;
				}
			}`+ bootstrapCss+
			`@page label{font-size: 9pt;}
			.container {				
				padding: 0 !important; 
				margin: 0 !important;				
				width: 100% !important;
				max-width: 680px !important;
				min-width: 680px !important;			
				font-size: 10pt !important;
				font-family: BCSans !important;
				color: #313132 !important;
			}
			`+
			`td.border-dark {border: 1px solid #313132 !important;}`+
			`th.border-dark {border: 1px solid #313132 !important;}`+
			`td.border-top-0{border-top: 0px solid #FFF !important;border-bottom: 1px solid #313132 !important;border-left: 1px solid #313132 !important; border-right: 1px solid #313132 !important;}`+
			`th.border-bottom-0{border-top: 1px solid #313132 !important;border-bottom: 0px solid #FFF !important;border-left: 1px solid #313132 !important; border-right: 1px solid #313132 !important;}`+
			`tr{height: 1.5rem;}`+
			`table.fullsize {table-layout: fixed; width: 100%; margin-top:0.5rem;}`+
			`table.fullsize tr{border:1px solid #313132;}`+
			`table.fullsize td{padding:0 0 0 .5rem; color: #313132;}`+

			`table.compactfullsize {table-layout: fixed; width: 100%; margin-top:0rem;}`+
			`table.compactfullsize tr{border:1px solid #313132;}`+
			`table.compactfullsize td{padding:0 0 0 .5rem; color: #313132;}`+

			`.answer{color: #000; display:inline; font-size:11pt;}`+
			`.answerbox{color: #000; font-size:11pt; display:block; text-indent:0px; margin:0.5rem 0 0.5rem 0 !important;}`+
    		`.uline{text-decoration: underline; display: inline;}`+
			`.form-header{display:block; margin:0 0 5rem 0;}`+
			`.form-header-po{display:block; margin:0 0 3.25rem 0;}`+
			`.form-header-ppm{display:block; margin:0 0 5.25rem 0;}`+
			`.form-header-cm{display:block; margin:0 0 7rem 0;}`+
			`.form-header-reloc{display:block; margin:0 0 5.25rem 0;}`+
			`.form-one-header{display:block; margin:0 0 3.25rem 0;}`+
			`.form-header-ea{display:block; margin:0 0 6rem 0;}`+
			`.form-header-enf{display:block; margin:0 0 4.5rem 0;}`+
			`.checkbox{margin:0 1rem 0 0;}`+
			`.marginleft{margin:0 0 0 0.07rem;}`+
			`.marginleftminus{margin:0 0 0 -1rem;}`+
			`.marginleftplus{margin:0 0 0 1rem !important;}`+
			`.margintopminus{margin-top:-0.5rem !important;}`+
			`.arrow-up-flash{ margin: 0.25rem auto 0 auto;width: 0;height: 0; border-left: 16px solid transparent; border-right: 16px solid transparent;border-bottom: 16px solid #E8E8E8;}`+
			`.arrow-up-box{margin: 0 auto;width: 16px;height:4px;background-color:#E8E8E8;border: 0px solid #E8E8E8;}`+
			`.coa-text-box{padding:0.5rem; border: 1px solid black; word-wrap: break-word;}`+
			`.coa-text-box-center{outline: 1px solid black; word-wrap: break-word; display:flex; align-items:center; justify-content:center; text-align:center;}`+
			`.coa-text-box-left{outline: 1px solid black; word-wrap: break-word; display:flex; align-items:center; justify-content:left; text-align:left;}`+			
			`.coa-help-box{padding:0.5rem; border: 1px solid #E8E8E8; background: #E8E8E8;}`+			
			
			`.coa-arrow-box{background: #E8E8E8;word-wrap: break-word;}`+
			`.coa-arrow-box-center{background: #E8E8E8;word-wrap: break-word; display:flex; align-items:center; justify-content:center; text-align:center;}`+
			`.coa-arrow-box-left{background: #E8E8E8;word-wrap: break-word; display:flex; align-items:center; justify-content:left; text-align:left;}`+
			`.coa-arrow-box-right{background: #E8E8E8;word-wrap: break-word; display:flex; align-items:center; justify-content:right; text-align:right;}`+


			
			`.arrow-right-flash-62{ margin-right:1.25rem;  width:0;height:0; border-top: 62px solid transparent; border-bottom: 62px solid transparent;border-left: 36px solid #E8E8E8;}`+
			`.arrow-right-flash-54{ margin-right:1.25rem;  width:0;height:0; border-top: 54px solid transparent; border-bottom: 54px solid transparent;border-left: 36px solid #E8E8E8;}`+
			`.arrow-right-flash-36{ margin-right:1.25rem;  width:0;height:0; border-top: 36px solid transparent; border-bottom: 36px solid transparent;border-left: 36px solid #E8E8E8;}`+
			`.arrow-right-flash-20{ margin-right:1.25rem;  width:0;height:0; border-top: 20px solid transparent; border-bottom: 20px solid transparent;border-left: 20px solid #E8E8E8;}`+
			`.arrow-right-flash-25{ margin-right:1.25rem;  width:0;height:0; border-top: 25px solid transparent; border-bottom: 25px solid transparent;border-left: 25px solid #E8E8E8;}`+

			
			`section{ counter-increment: question-counter; text-indent: -17px; text-align: justify; text-justify: inter-word; margin: 0.5rem 0.5rem 0.5rem 1rem;}`+ 
			`section:before {font-weight: bolder; content:counter(question-counter) ".";}`+
			`section.resetquestion{counter-reset: question-counter;}`+
			
			`ol.resetcounter{list-style: none;counter-reset: bracket-counter;}`+
			`ol li.bracketnumber{text-indent: -25px;text-align: justify;text-justify: inter-word;margin:1rem 0;counter-increment: bracket-counter;}`+
			`ol li.bracketnumber:before {content:"(" counter(bracket-counter) ") ";font-weight: bold;}`+
			`ol.resetlist {list-style: none;counter-reset: list-counter;}`+
			`ol li.listnumber{text-indent: -25px;text-align: justify;text-justify: inter-word;margin:1rem 0;counter-increment: list-counter;}`+
			`ol li.listnumber:before {content:counter(list-counter) ". ";font-weight: bold;}`+
			`ol.resetcounteralpha {list-style: none;counter-reset: alpha-counter;}`+
			`ol li.bracketalpha{text-indent: -20px;margin:0.075rem 0;counter-increment: alpha;}`+
			`ol li.bracketalpha:before {content:counter(alpha, lower-alpha)") ";}`+				
			`ol.resetcounterroman {list-style: none;counter-reset: roman-counter;}`+			  
			`ol li.bracketroman {text-indent: -20px;margin:0.25rem 0;counter-increment: roman;}`+
			`ol li.bracketroman:before {content:counter(roman, lower-roman)") ";}`+
						
			`
			body{				
				font-family: BCSans;
			}
			`+
		`</style>
		</head>
		<body>
			
				<div class="container">
					`+html+
		`</div></body></html>`	 
	
	return body
})