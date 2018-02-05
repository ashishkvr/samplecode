// contains only the data field as used to merge with a main survey
export const form = {
	"_id": "uzh:FormView:Registration",
	"appId": "tourist",
	"className": "touristSurvey",
	"data": [{
			"title": "Heute habe ich Folgendes gegessen oder getrunken",
            "subtitle": "(bitte alles Zutreffende ankreuzen):",
			"component": "CheckboxGroup",
			"options": [{
					"label": "Rohen Salat / rohes Gemüse/ ungeschälte Früchte",
					"value": 0
				},
				{ 
					"label": "Rohes Fleisch oder rohen Fisch",
					"value": 1
				},
				{
					"label": "Essen von einer Strassenküche",
					"value": 2
				},
				{
					"label": "Essen von einem Buffet",
					"value": 3
				},
				{
					"label": "Vom Vortag übrig gebliebenes Essen",
					"value": 4
				},
				{
					"label": "Ungereinigtes Leitungswasser",
					"value": 5
				},
				{
					"label": "Nichts des oben Genannten",
					"value": 6,
					"exclusive": true
				}
			]
		},
		{
			"title": "Heute habe ich mich wie folgt gegen Mücken geschützt",
            "subtitle": "(bitte alles Zutreffende ankreuzen):",
			"component": "CheckboxGroup",
			"options": [{
					"label": "Insektensprays verwendet (für die Haut)",
					"value": 0
				},
				{
					"label": "Insektizid verwendet (für Kleidung oder im Raum)",
					"value": 1
				},
				{
					"label": "Kleider getragen, die Arme und Beine bedecken",
					"value": 2
				},
				{
					"label": "Socken oder geschlossenes Schuhwerk getragen",
					"value": 3
				},
				{
					"label": "Mückenschutz während der Nacht verwendet (z.B. Moskito-Netz, Screen, Air-Conditioning) ",
					"value": 4
				},
				{
					"label": "Nichts des oben Genannten",
					"value": 5,
					"exclusive": true
				}
			]
		},
		{
			"title": "Ich habe in den letzten 24h Alkohol getrunken und/oder Drogen oder Genussmittel eingenommen ",
			"subtitle": "(bitte alles Zutreffende ankreuzen):",
			"component": "CheckboxGroup",
			"foldable": true,
			"options": [{
					"label": "den Effekt des Alkohols gespürt",
					"value": 0
				},
				{
					"label": "Marihuana konsumiert",
					"value": 1
				},
				{
					"label": "eine andere Droge eingenommen",
					"value": 2
				},
				{
					"label": "Nichts des oben Genannten",
					"value": 3,
					"exclusive": true
				}
			]
		},
		{
			"title": "Ich habe heute Medikamente gegen Durchfall, ein Malarianotfallmedikament oder ein Antibiotikum eingenommen",
		    "subtitle": "(bitte alles Zutreffende ankreuzen):",
			"component": "CheckboxGroup",
			"foldable": true,
			"options": [{
					"label": "Loperamid/Imodium",
					"value": 0,
				},
				{
					"label": "Malaria-Notfallmedikament",
					"value": 1,
				},
				{
					"label": "Antibiotikum",
					"value": 2,
				},
				{
					"label": "Nichts von dem oben Genannten",
					"value": 3,
					"exclusive": true
				}
			]
		},
		{
			"title": "Ich habe heute Medikamente lokal gekauft ",
			"component": "ButtonGroup",
			"options": [{
					"label": "Ja",
					"value": 1
				},
				{
					"label": "Nein",
					"value": 0
				}
			]
		}, {
			"title": "Ich kam heute mit dem lokalen Gesundheitswesen in Kontakt",
			"subtitle": "einschliesslich Arzt, Apotheke, Gesundheitszentrum oder Spital (bitte alles Zutreffende ankreuzen):",
			"component": "CheckboxGroup",
			"foldable": true,
			 "extraHint": "Was war der Grund für die Kontaktaufnahme?",
			"options": [{
					"label": "Ich habe in einer Apotheke Medikamente gekauft",
					"value": 0,
				},
				{
					"label": "Ich habe bei einem Strassenverkäufer Medikamente gekauft",
					"value": 1,
				},
				{
					"label": "Ich habe Medikamente von anderen Personen erhalten (z.B. Mitreisende, Hotelpersonal, Guide)",
					"value": 2,
				},
				{
					"label": "Ich habe einen Arzt konsultiert / war in einem Gesundheitszentrum",
					"value": 3,
				},
				{
					"label": "Ich war in einem Spital",
					"value": 4,
				},
				{
					"label": "Ich habe mit einer Fachperson in der Schweiz Kontakt aufgenommen (z.B. Notfallnummer, Hausarzt, anderer Spezialist)",
					"value": 5,
				},
				{
					"label": "Nichts des oben Genannten",
					"extraHint": "Bitte Genauer beschreiben",
					"value": 6,
					"exclusive": true
				}
			]
		},
		{
			"title": "Ich war heute Wandern/Trekken",
			"foldable": true,
			"extraHint": "Die Tour dauerte...Stunden",
			"component": "CheckboxGroup",
			"options": [
				{
					"label": "Die Tour hat eine grosse körperliche Anstrengung bedeutet",
					"value": 0
				}
			]
		},
		{
			"title": "Ich habe mich heute anderweitig körperlich betätigt",
			"foldable": true,
			"component": "CheckboxGroup",
		    "subtitle": "(bitte alles Zutreffende ankreuzen):",
			"options": [
				{
					"label": "Wassersport (z.B. Schwimmen, Tauchen, Schnorcheln)",
					"value": 0
				},
				{
					"label": "Bootfahren (z.B. River Rafting, Kajakfahren) ",
					"value": 1
				},
				{
					"label": "Abenteuersport (z.B. Fallschirmspringen, Bungee-jumping, Zip-lining",
					"value": 2
				},
				{
					"label": "Joggen",
					"value": 3
				},
				{
					"label": "Andere Sportarten (z.B. Ballsport, Fahrradfahren, Golf)",
					"value": 4
				},
				{
					"label": "Anderes",
					"value": 6,
					"extra": true
				}
			]
		},
		{
			"title": "Ich hatte heute engen Kontakt mit Tieren",
			"subtitle": "z.B. streicheln/berühren (bitte alles Zutreffende ankreuzen):",
            "foldable": true,
			"component": "CheckboxGroup",
			"options": [
				{
					"label": "Hund",
					"value": 0
				},
				{
					"label": "Fledermaus",
					"value": 1
				},
				{
					"label": "Anderes pelztragendes Tier (z.B. Katze, Affe)",
					"value": 2
				},
				{
					"label": "Schlange",
					"value": 3
				},
				{
					"label": "Anderes",
					"value": 4,
					"extra": true
				}
			]
		},
		{
			"title": "Ich bin heute mit einem Fahrrad/Motorrad/Tuk-Tuk/Bajaji/Mototaxi gefahren",
			"subtitle": "(bitte alles Zutreffende ankreuzen):",
			"foldable": true,
			"component": "CheckboxGroup",
			"options": [
				{
					"label": "mit Helm",
					"value": 0
				},
				{
					"label": "ohne Helm",
					"value": 1
				},
				{
					"label": "Ohne Sicherheitsgurt",
					"value": 2
				},
				{
					"label": "Nach Eintreten der Dunkelheit",
					"value": 3
				},
				{
					"label": "Auf nicht gesicherten Strassen z.B. Baustellen",
					"value": 4
				},
				{
					"label": "Nichts des oben genannten",
					"value": 5,
					"exclusive": true
				}
			]
		},
		{
			"title": "Ich hatte heute Geschlechtsverkehr ohne Kondom",
			"subtitle": "(bitte alles Zutreffende ankreuzen):",
			"component": "CheckboxGroup",
			"foldable": true,
			"ignorable": true,
			"options": [
				{
					"label": "mit meiner Lebenspartnerin, mit meinem Lebenspartner",
					"value": 0
				},
				{
					"label": "einer anderen Touristin, einem anderen Touristen ",
					"value": 1
				},
				{
					"label": "mit Einheimischer, Einheimischem",
					"value": 2
				},
				{
					"label": "bezahlt",
					"value": 3
				},
				{
					"label": "Keiner/Keinem der oben Genannten",
					"value": 4,
					"exclusive": true
					
				}
			]
		},
		{
			"title": "Jetzt folgen einige Fragen über einen Unfall oder eine Verletzung, welche Sie heute möglicherweise erlebt haben. ",
            "subtitle": "Alles Zutreffende bitte nach Schweregrad bewerten (0: kein Ereignis, 1: Mild, 2: Moderat, 3: Moderat-Schwer. 4: Schwer)",
			"component": "SliderGroup",
			"valuesText": ["Kein Ereignis","Mild","Moderat", "Moderat-Schwer", "Schwer"],
			"options": [
				{
					"label": "Verkehrsunfall",
					"extra": true,
					"extraHint": "Bitte genauer beschreiben"
				},
				{
					"label": "Sturz o. Verstauchung",
					"extra": true,
					"extraHint": "Bitte genauer beschreiben"
				},
				{
					"label": "Sportunfall",
					"extra": true,
					"extraHint": "Bitte genauer beschreiben"
				},
				{
					"label": "Wunde, Schnittverletzung",
					"extra": true,
					"extraHint": "Bitte genauer beschreiben"
				},
				{
					"label": "Biss, Kratzen oder Lecken einer Wunde durch ein Säugetier ",
					"extra": true,
					"extraHint": "Bitte genauer beschreiben"
				},
				{
					"label": "Verletzung durch Meerestiere",
					"extra": true,
					"extraHint": "Bitte genauer beschreiben"
				},
				{
					"label": "Andere Unfälle/Verletzungen",
					"extra": true,
					"extraHint": "Bitte genauer beschreiben"
				}
			]
		},
		{
			"title": "Jetzt folgen einige Fragen zum heutigen Wohlbefinden.",
			  "subtitle": "Alles Zutreffende bitte nach Schweregrad bewerten",

			"component": "SliderGroup",
			"valuesText": ["Nein","Mild","Moderat", "Moderat-Schwer", "Stark"],
			"options": [
							{
					"label": "Ich fühle mich aufgeregt, in erwartungsvoller Anspannung",
					"extra": true,
					"extraHint": "Kennen Sie die Ursache? Können Sie diese beschreiben?"
				},{
					"label": "Ich fühle mich ängstlich, angespannt oder gereizt",
					"extra": true,
					"extraHint": "Kennen Sie die Ursache? Können Sie diese beschreiben?"
				},
				{
					"label": "Ich fühle mich energielos",
					"extra": true,
					"extraHint": "Kennen Sie die Ursache? Können Sie diese beschreiben?"
				},
				{
					"label": "Mir gehen beunruhigende Gedanken durch den Kopf ",
					"extra": true,
					"extraHint": "Kennen Sie die Ursache? Können Sie diese beschreiben?"
				}
			]
		},
		{
			"title": "Ich habe meine Reisepläne aufgrund von Beunruhigung/Stress geändert",
			"component": "ButtonGroup",
			"options": [{
					"label": "Ja",
					"value": 1
				},
				{
					"label": "Nein",
					"value": 0
				}
			]
		},
		{
			"title": "Jetzt folgen einige Fragen über Beschwerden, welche Sie heute möglicherweise hatten.",
			"subtitle": "Alles Zutreffende bitte nach Schweregrad bewerten",
			"component": "SliderGroup",
			"valuesText": ["Keine Beschwerden","Mild","Moderat", "Moderat-Schwer", "Starke Beschwerden"],
			"options": [{
					"label": "Übelkeit"
				},
				{
					"label": "Schwindel"
				},
				{
					"label": "Erbrechen"
				},
				{
					"label": "Bauchschmerzen"
				},
				{
					"label": "Durchfall"
				},
				{
					"label": "Verstopfung"
				}
			]
		},
		{
			"title": "Alles Zutreffende bitte nach Schweregrad bewerten",
			"component": "SliderGroup",
			"valuesText": ["Keine Beschwerden","Mild","Moderat", "Moderat-Schwer", "Starke Beschwerden"],
			"options": [{
					"label": "Husten"
				},
				{
					"label": "Hals- oder Ohrenschmerzen"
				},
				{
					"label": "Verstopfte Nase oder laufende Nase "
				},
				{
					"label": "Kurzatmigkeit in Ruhe "
				},
				{
					"label": "Kurzatmigkeit bei körperlicher Anstrengung "
				}
			]
		},
		{
			"title": "Alles Zutreffende bitte nach Schweregrad bewerten",
			"component": "SliderGroup",
			"valuesText": ["Keine Beschwerden","Mild","Moderat", "Moderat-Schwer", "Starke Beschwerden"],
			"options": [{
					"label": "Hautausschlag "
				},
				{
					"label": "Juckreiz aufgrund von Mückenstichen "
				},
				{
					"label": "Anderer Juckreiz "
				},
				{
					"label": "Sonnenbrand "
				}
			]
		},
		{
			"title": "Alles Zutreffende bitte nach Schweregrad bewerten",
			"component": "SliderGroup",
			"valuesText": ["Keine Beschwerden","Mild","Moderat", "Moderat-Schwer", "Starke Beschwerden"],
			"options": [{
					"label": "Fieber"
				},
				{
					"label": "Kopfschmerzen "
				},
				{
					"label": "Muskelschmerzen"
				},
				{
					"label": "Gelenksschmerzen"
				},
				{
					"label": "Gliederschmerzen"
				}
			]
		},
		{
			"title": "Geplante Aktivitäten",
			"component": "CheckboxGroup",
			"options": [{
					"label": "Ich habe/hatte keine Probleme, meinen heutigen Aktivitäten nachzugehen ",
					"value": 0,
					"exclusive": true
				},
				{
					"label": "Ich habe/hatte leichte Probleme, meinen heutigen Aktivitäten nachzugehen",
					"value": 1,
					"exclusive": true
				},
				{
					"label": "Ich habe/hatte mässige Probleme, meinen heutigen Aktivitäten nachzugehen",
					"value": 2,
					"exclusive": true
				},
				{
					"label": "Ich habe/hatte grosse Probleme, meinen heutigen Aktivitäten nachzugehen",
					"value": 3,
					"exclusive": true
				},
				{
					"label": "Ich bin/war nicht in der Lage, meinen heutigen Aktivitäten nachzugehen",
					"value": 4,
					"exclusive": true
				}
				
			]
		},
		{
			"title": "Wie beurteilen Sie Ihren heutigen Reisetag insgesamt?",
			"component": "CheckboxGroup",
			"options": [{
					"label": "Ich fand den Tag ganz schlecht",
					"value": 0,
					"exclusive": true
				},
				{
					"label": "Ich fand den Tag überwiegend schlecht",
					"value": 1,
					"exclusive": true
				},
				{
					"label": "Ich fand den Tag mittelgut",
					"value": 2,
					"exclusive": true
				},
				{
					"label": "Ich fand den Tag überwiegend gut",
					"value": 3,
					"exclusive": true
				},
				{
					"label": "Ich fand den Tag sehr gut",
					"value": 4,
					"exclusive": true
				}					
			]
		},


	],
	"eventId": "tourist",
	"title": "Aktivitäten",
	"uploaded": true
}