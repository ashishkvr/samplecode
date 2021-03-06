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
 			"title": "Ich habe heute meine Routinemedikation(z.B. Blutdruckmedikamente, Blutverdünnung) genommen"
 		},
 		{
 			"title": "Ich hatte ein Druckgefühl oder Schmerzen in der Brust während Anstrengung (Angina pectoris).  0 Keine Beschwerden, 10 am Schlimmsten vorstellbar",

 			"component": "SliderGroup",
 			"min": 0,
 			"max": 10,
 			"step": 1, 
 			"options": [{
 				"label": "Krankheitsaktivität"
 			}]
 		},
 		{
 			"component": "ButtonGroup",
 			"options": [
 				{
 					"label": "Ja",
 					"value": 1
 				},
 				{
 					"label": "Nein",
 					"value": 0
 				}
 			],
 			"title": "Ich musste zusätzliche Medikation oder eine höhere Dosis meiner Routinemedikation gegen diese Beschwerden einnehmen (z.B. Nitrospray/Kapsel)"
 		}
 	]
 }