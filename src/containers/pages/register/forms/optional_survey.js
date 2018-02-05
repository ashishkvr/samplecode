import {
	Alert
} from 'react-native';
export const askUser = (callback) => Alert.alert(
            'Über 2500m gewesen?',
            'Wenn Sie über 2500m waren, füllen Sie bitte folgende Fragen aus',
        [
            {text: 'Ja', onPress: () => callback(1) }, //Action 
            {text: 'Später', onPress:  () => callback(2) },
            {text: 'Nicht geplant', onPress:  () => callback(3), style: 'cancel'},
        ],
  { cancelable: false }
)

export const form =    {
 	"appId": "tourist",
 	"className": "ams",
 	"data": [{
 			"title": "Zur Zeit habe ich Kopfweh:",

 			"component": "CheckboxGroup",
 			"options": [{
 					"label": "Überhaupt nicht",
 					"value": 0,
 					"exclusive": true
 				},
 				{
 					"label": "Mildes Kopfweh",
 					"value": 1,
 					"exclusive": true
 				},
 				{
 					"label": "Mittelschweres Kopfweh",
 					"value": 2,
 					"exclusive": true
 				},
 				{
 					"label": "Schweres Kopfweh, das mich handlungsunfähig macht",
 					"value": 3,
 					"exclusive": true
 				}
 			]
 		},
 		{
 			"title": "Zur Zeit habe ich Bauchbeschwerden:",

 			"component": "CheckboxGroup",
 			"options": [{
 					"label": "Überhaupt nicht, guter Appetit",
 					"value": 0,
 					"exclusive": true
 				},
 				{
 					"label": "Schlechter Appetit oder Übelkeit",
 					"value": 1,
 					"exclusive": true
 				},
 				{
 					"label": "Schwere Übelkeit oder Erbrechen",
 					"value": 2,
 					"exclusive": true
 				},
 				{
 					"label": "Schwere Übelkeit oder Erbrechen, das mich handlungsunfähig macht",
 					"value": 3,
 					"exclusive": true
 				}
 			]
 		}, {
 			"title": "Zur Zeit bin ich abgeschlagen und/oder schwach:",

 			"component": "CheckboxGroup",
 			"options": [{
 					"label": "Überhaupt nicht",
 					"value": 0,
 					"exclusive": true
 				},
 				{
 					"label": "Leichte Abgeschlagenheit, Schwäche",
 					"value": 1,
 					"exclusive": true
 				},
 				{
 					"label": "Mittelschwere Abgeschlagenheit/Schwäche",
 					"value": 2,
 					"exclusive": true
 				},
 				{
 					"label": "Abgeschlagenheit und Schwäche, die mich handlungsunfähig machen",
 					"value": 3,
 					"exclusive": true
 				}
 			]
 		}, {
 			"title": "Zur Zeit ist mir schwindlig und/oder ich bin benommen",

 			"component": "CheckboxGroup",
 			"options": [{
 					"label": "Überhaupt nicht",
 					"value": 0,
 					"exclusive": true
 				},
 				{
 					"label": "Leichter Schwindel und Benommenheit",
 					"value": 1,
 					"exclusive": true
 				},
 				{
 					"label": "Mittlerer Schwindel und Benommenheit",
 					"value": 2,
 					"exclusive": true
 				},
 				{
 					"label": "Schwerer Schwindel und Benommenheit, die mich handlungsunfähig machen",
 					"value": 3,
 					"exclusive": true
 				}
 			]
 		}, {
 			"title": "Letzte Nacht hatte ich Schlafstörungen.",
            "extraHint": "Ich schlief auf.............m Höhe",
 			"component": "CheckboxGroup",
 			"options": [{
 					"label": "Überhaupt nicht, ich schlief wie normal zu Hause",
 					"value": 0,
 					"exclusive": true
 				},
 				{
 					"label": "Ich habe nicht so gut wie üblich geschlafen ",
 					"value": 1,
 					"exclusive": true
 				},
 				{
 					"label": "Ich bin mehrmals aufgewacht, habe schlecht geschlafen",
 					"value": 2,
 					"exclusive": true
 				},
 				{
 					"label": "Ich konnte überhaupt nicht schlafen ",
 					"value": 3,
 					"exclusive": true
 				}
 			]
 		}, {
 			"title": "Globalbeurteilung. Falls Sie irgendwelche dieser Beschwerden haben, wie beeinflussen sie Ihre Handlungsfähigkeit",

 			"component": "CheckboxGroup",
 			"options": [{
 					"label": "Überhaupt nicht",
 					"value": 0,
 					"exclusive": true
 				},
 				{
 					"label": "Leicht vermindert",
 					"value": 1,
 					"exclusive": true
 				},
 				{
 					"label": "Ich kann nur noch mit Mühe funktionieren",
 					"value": 2,
 					"exclusive": true
 				},
 				{
 					"label": "Ich bin praktisch handlungsunfähig und muss herumliegen",
 					"value": 3,
 					"exclusive": true
 				}
 			]
 		},
 		{
 			"title": "AMS-C Score. Geben Sie zu jeder Aussage jene Zahl an, die am besten angibt, wie Sie sich im Moment fühlen. Wenn Sie das entsprechende Symptom nicht haben, geben Sie die 0 an ",
 			"component": "SliderGroup",
 			"min": 0,
 			"max": 5,
 			"step": 1, 		
 			"valuesText": ["überhaupt nicht","eine Spur","leicht", "mässig", "stark", "sehr stark"],	
 			"options": [{
 					"label": "Ich bin benommen"
 				},
 				{
 					"label": "Ich habe Kopfschmerzen"
 				},
 				{
 					"label": "Mir ist schwindelig"
 				},
 				{
 					"label": "Mir ist schwarz vor den Augen"
 				},
 				{
 					"label": "Ich sehe wie durch einen Schleier"
 				},
 				{
 					"label": "Meine Bewegungen sind unsicher"
 				},
 				{
 					"label": "Ich fühle mich schwach"
 				},
 				{
 					"label": "Mir ist übel"
 				},
 				{
 					"label": "Ich habe keinen Appetit mehr"
 				},
 				{
 					"label": "Ich fühle mich krank"
 				},
 				{
 					"label": "Ich habe das Gefühl wie bei einem Kater"
 				}
 			]

 		}
 	],
 	"eventId": "tourist",
 	"title": "Reise über 2500m",
 	"uploaded": true
 }