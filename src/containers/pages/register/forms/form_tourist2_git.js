// contains only the data field as used to merge with a main survey
export const form =  {
 	"data": [{
 			"component": "ButtonGroup",
            "options": [{
 					"label": "Ja",
 					"value": 1
 				},
 				{
 					"label": "Nein",
 					"value": 0
 				},
 				{
 					"label": "Nicht relevant",
 					"value": -1
 				}
 			],
 			"title": "Ich habe heute meine Routinemedikation(z.B. Budesonid) genommen"
 		},
 		{
 			"title": "Die Krankheitsaktivät meiner entzündlichen Darmerkrankung war auf einer Skala von 0-10. 0 Keine Beschwerden, 10 am Schlimmsten vorstellbar",

 			"component": "SliderGroup",
 			"min": 0,
 			"max": 10,
 			"options": [{
 				"label": "Krankheitsaktivität"
 			}]
 		},
 		{
 			"component": "ButtonGroup",
 			"options": [{
 					"label": "Nein",
 					"value": 0
 				},
 				{
 					"label": "Ja",
 					"value": 1
 				}
 			],
 			"title": "Ich musste zusätzliche Medikation oder eine höhere Dosis meiner Routinemedikation gegen diese Beschwerden einnehmen"
 		}
 	]
 }