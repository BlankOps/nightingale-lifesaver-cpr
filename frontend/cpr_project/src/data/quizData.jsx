const quizData = [
    {
       question: "What is a sign of cardiac arrest?",
    options: [
      "The victim doesn't respond when stimulating her",
      "The victim loses consciousness",
      "The victim falls",
      "All of the above"
    ],
    correctAnswer: "All of the above"
  },
  {
    question: "What is a sign before a cardiac arrest?",
    options: [
      "High fever and shivering",
      "Prolonged chest pain extending to the arms",
      "Abdominal cramps",
      "Head ache"
    ],
    correctAnswer: "Prolonged chest pain extending to the arms"
  },
  {
    question: "What should be the first reflex to have when assisting to a cardiac arrest?",
    options: [
      "Check the victim's identification",
      "Call the emergency services",
      "Give the victim water",
      "Try to move the victim"
    ],
    correctAnswer: "Call the emergency services"
  },
  {
    question: "What informations you should provide to the emergency service?",
    options: [
      "Describe the situation to the emergency service operator",
      "Tell him what has been already done",
      "Give him the nearest address possible",
      "All of the above"
    ],
    correctAnswer: "All of the above"
  },
  {
    question: "When performing CPR, where should you place the victim?",
    options: [
      "Hard surface",
      "Soft surface",
      "Does not matter",
      "Sterilized place"
    ],
    correctAnswer: "Hard surface"
  },
  {
    question: "When performing CPR, where should your hands be placed on the victim?",
    options: [
      "On the victim's stomach",
      "On the victim's throat",
      "In the middle of the chest, between the breasts",
      "On the victim's forehead"
    ],
    correctAnswer: "In the middle of the chest, between the breasts"
  },
  {
    question: "How deep should you press into the chest when performing CPR?",
    options: [
      "1-2 cm",
      "2-3 cm",
      "3-4 cm",
      "4-5 cm"
    ],
    correctAnswer: "3-4 cm"
  },
  {
    question: "How many time you should press when performing CPR before mouth to mouth?",
    options: [
      "10 times",
      "20 times",
      "30 times",
      "40 times"
    ],
    correctAnswer: "30 times"
  },
  {
    question: "What should you do after performing 30 chest compressions during CPR?",
    options: [
      "Take a break",
      "Perform two breaths or mouth-to-mouth",
      "Stop performing",
      "Call for help again"
    ],
    correctAnswer: "Perform two breaths or mouth-to-mouth"
  },
  {
    question: "How long does it take for brain damage to become irreversible without oxygen?",
    options: [
      "1 minute",
      "3 minutes",
      "5 minutes",
      "10 minutes"
    ],
    correctAnswer: "5 minutes"
  },
  {
    question: "Why is it important to perform chest compressions properly during CPR?",
    options: [
      "To keep the victim's body warm",
      "To circulate the blood and oxygenate the brain",
      "To prevent muscle cramps",
      "To wake the victim up"
    ],
    correctAnswer: "To circulate the blood and oxygenate the brain"
  },
  {
    question: "How much does a victim's chance of survival increase with each minute saved?",
    options: [
      "1%",
      "5%",
      "10%",
      "15%"
    ],
    correctAnswer: "10%"
  },
  {
    question: "What should you do if you are alone and find someone in cardiac arrest?",
    options: [
      "Perform CPR for 2 minutes before calling for help",
      "Call emergency services immediately and then start CPR",
      "Look for a defibrillator first",
      "Wait for other people"
    ],
    correctAnswer: "Call emergency services immediately and then start CPR"
  },
  {
    question: "Which of the following is NOT a recommended action during CPR?",
    options: [
      "Performing chest compressions on a hard surface",
      "Pressing down with your arms straight and whole body weight",
      "Performing compressions with only your hands and no body weight",
      "Giving breaths every 30 compressions"
    ],
    correctAnswer: "Performing compressions with only your hands and no body weight"
  },
  {
    question: "What is the recommended compression rate during CPR?",
    options: [
      "60–80 compressions per minute",
      "100–120 compressions per minute",
      "150–180 compressions per minute",
      "200 compressions per minute"
    ],
    correctAnswer: "100–120 compressions per minute"
  },
  {
    question: "When using an AED (defibrillator), what is the first step?",
    options: [
      "Place the pads directly on the victim's clothes",
      "Turn on the AED and follow the instructions",
      "Start chest compressions immediately",
      "Give two breaths before using the AED"
    ],
    correctAnswer: "Turn on the AED and follow the instructions"
  },
  {
    question: "Where should AED pads be placed on an adult victim?",
    options: [
      "One on the stomach, one on the back",
      "One on the right chest, one on the left side below the armpit",
      "Both pads on the chest close together",
      "One on the neck, one on the leg"
    ],
    correctAnswer: "One on the right chest, one on the left side below the armpit"
  },
  {
    question: "If a victim starts breathing normally again after CPR, what should you do?",
    options: [
      "Stop everything and leave the victim",
      "Place the victim in the recovery position and monitor breathing",
      "Continue compressions anyway",
      "Give them something to drink"
    ],
    correctAnswer: "Place the victim in the recovery position and monitor breathing"
  },
  {
    question: "What should you check before starting CPR?",
    options: [
      "If the victim is breathing and has a pulse",
      "If the victim is sleeping",
      "If the victim is cold",
      "If the victim has eaten recently"
    ],
    correctAnswer: "If the victim is breathing and has a pulse"
  },
  {
    question: "Why is it important not to interrupt chest compressions for too long?",
    options: [
      "Because the victim may wake up suddenly",
      "Because blood circulation and oxygen supply stop",
      "Because the rescuer may lose rhythm",
      "Because it makes CPR more tiring"
    ],
    correctAnswer: "Because blood circulation and oxygen supply stop"
  },

  // --- 21 à 40 : CPR for childs ---
  {
    question: "How deep should chest compressions be for a child?",
    options: [
      "1-2 cm",
      "2-3 cm",
      "4-5 cm",
      "5-6 cm"
    ],
    correctAnswer: "4-5 cm"
  },
  {
    question: "How many fingers should you use to perform CPR on an infant?",
    options: [
      "One",
      "Two",
      "Three",
      "Four"
    ],
    correctAnswer: "Two"
  },
  {
    question: "What is the ratio of compressions to breaths for children and infants?",
    options: [
      "15:2",
      "30:2",
      "50:2",
      "100:2"
    ],
    correctAnswer: "30:2"
  },
  {
    question: "When performing CPR on a child, how should you position your hands?",
    options: [
      "Middle of the chest with one hand",
      "Middle of the chest with two hands",
      "On the abdomen",
      "On the forehead"
    ],
    correctAnswer: "Middle of the chest with one hand"
  },
  {
    question: "For an infant, where should you check for a pulse?",
    options: [
      "Carotid artery",
      "Brachial artery",
      "Radial artery",
      "Femoral artery"
    ],
    correctAnswer: "Brachial artery"
  },
  {
    question: "What should you do if a child is choking but still conscious?",
    options: [
      "Perform CPR immediately",
      "Encourage coughing and perform back blows",
      "Give water",
      "Call emergency services only"
    ],
    correctAnswer: "Encourage coughing and perform back blows"
  },
  {
    question: "How should you perform CPR if the child has a heart condition?",
    options: [
      "Stop and call emergency services first",
      "Perform CPR normally but monitor for complications",
      "Only give breaths",
      "Only give compressions"
    ],
    correctAnswer: "Perform CPR normally but monitor for complications"
  },
  {
    question: "If a child vomits during CPR, what should you do?",
    options: [
      "Continue compressions immediately",
      "Turn the child on the side and clear the airway",
      "Give water",
      "Stop CPR"
    ],
    correctAnswer: "Turn the child on the side and clear the airway"
  },
  {
    question: "If an infant is unresponsive but breathing, what position should they be placed in?",
    options: [
      "On their stomach",
      "Recovery position on side",
      "Sit upright",
      "Hold in arms"
    ],
    correctAnswer: "Recovery position on side"
  },
  {
    question: "How often should you change rescuers when performing CPR on a child?",
    options: [
      "Every 1 minute",
      "Every 2 minutes",
      "Every 5 minutes",
      "Never"
    ],
    correctAnswer: "Every 2 minutes"
  },

  // --- 41 à 60 : AED and particularity  ---
  {
    question: "Before using an AED, what should you check?",
    options: [
      "Remove clothing from chest",
      "Ensure chest is dry",
      "Do not touch victim while analyzing",
      "All of the above"
    ],
    correctAnswer: "All of the above"
  },
  {
    question: "If a victim has a pacemaker, how should you place AED pads?",
    options: [
      "Avoid pacemaker and place normally",
      "Place pads over pacemaker",
      "Do not use AED",
      "Call emergency services first"
    ],
    correctAnswer: "Avoid pacemaker and place normally"
  },
  {
    question: "If an AED advises 'shock', what should you do?",
    options: [
      "Ensure no one touches the victim and press shock button",
      "Ignore and continue CPR",
      "Give breaths first",
      "Move the victim"
    ],
    correctAnswer: "Ensure no one touches the victim and press shock button"
  },
  {
    question: "Can you use AED on a wet surface?",
    options: [
      "Yes, always",
      "No, remove water first",
      "Only on adults",
      "Only on children"
    ],
    correctAnswer: "No, remove water first"
  },
  {
    question: "Should you remove medication patches before using AED?",
    options: [
      "Yes, remove patch first",
      "No, leave it",
      "Only if patch is metal",
      "Only on children"
    ],
    correctAnswer: "Yes, remove patch first"
  },
  {
    question: "If a victim is lying on metal, should you move them before AED use?",
    options: [
      "Yes, move to safe surface",
      "No, it's safe",
      "Only if adult",
      "Only if child"
    ],
    correctAnswer: "Yes, move to safe surface"
  },
  {
    question: "If a victim starts breathing again after AED use, what is next?",
    options: [
      "Continue CPR",
      "Place in recovery position",
      "Give two breaths",
      "Call emergency services"
    ],
    correctAnswer: "Place in recovery position"
  },
  {
    question: "Should you remove jewelry before using AED?",
    options: [
      "Yes, if it interferes with pad placement",
      "No, always leave it",
      "Only rings",
      "Only necklaces"
    ],
    correctAnswer: "Yes, if it interferes with pad placement"
  },
  {
    question: "What is the first step when using AED on a child?",
    options: [
      "Turn on AED and follow instructions",
      "Give breaths first",
      "Perform chest compressions first",
      "Call emergency services"
    ],
    correctAnswer: "Turn on AED and follow instructions"
  },
  {
    question: "Can AED pads be used on infants?",
    options: [
      "Yes, with pediatric pads",
      "No, never",
      "Yes, normal pads",
      "Only if adult is present"
    ],
    correctAnswer: "Yes, with pediatric pads"
  },
  {
  question: "What is the universal sign of choking?",
  options: [
    "Holding the throat with both hands",
    "Coughing loudly",
    "Falling unconscious immediately",
    "Turning red in the face"
  ],
  correctAnswer: "Holding the throat with both hands"
  },
  {
    question: "What should you do first if someone is choking but can still cough or breathe?",
    options: [
      "Encourage them to continue coughing",
      "Perform abdominal thrusts immediately",
      "Give them water",
      "Start CPR"
    ],
    correctAnswer: "Encourage them to continue coughing"
  },
  {
    question: "What is the correct technique for helping a choking adult?",
    options: [
      "Back blows and abdominal thrusts",
      "Mouth-to-mouth only",
      "Pressing chest only",
      "Shaking the person"
    ],
    correctAnswer: "Back blows and abdominal thrusts"
  },
  {
    question: "If a choking victim becomes unconscious, what should you do?",
    options: [
      "Start CPR immediately",
      "Give water",
      "Slap their face",
      "Wait for help"
    ],
    correctAnswer: "Start CPR immediately"
  },
  {
    question: "What should you do if an infant is choking?",
    options: [
      "Back blows and chest thrusts",
      "Abdominal thrusts",
      "Start CPR",
      "Give water"
    ],
    correctAnswer: "Back blows and chest thrusts"
  },
  {
    question: "If a person is bleeding heavily, what is the first action?",
    options: [
      "Apply direct pressure on the wound",
      "Give them water",
      "Elevate their legs",
      "Check breathing"
    ],
    correctAnswer: "Apply direct pressure on the wound"
  },
  {
    question: "What should you do if blood soaks through a bandage?",
    options: [
      "Remove it and replace with a new one",
      "Add more bandages on top",
      "Wash with water",
      "Do nothing"
    ],
    correctAnswer: "Add more bandages on top"
  },
  {
    question: "If a person has a nosebleed, what is the correct position?",
    options: [
      "Sit leaning forward and pinch the nose",
      "Lie down flat",
      "Tilt head backwards",
      "Put ice in the nose"
    ],
    correctAnswer: "Sit leaning forward and pinch the nose"
  },
  {
    question: "What should you do in case of severe burn?",
    options: [
      "Cool the burn with running water",
      "Apply butter or oil",
      "Cover with cotton",
      "Break blisters"
    ],
    correctAnswer: "Cool the burn with running water"
  },
  {
    question: "Why should you not apply ice directly on a burn?",
    options: [
      "It may cause more tissue damage",
      "It is not cold enough",
      "It slows down healing",
      "It causes infection"
    ],
    correctAnswer: "It may cause more tissue damage"
  },
  {
    question: "What should you do if clothing sticks to a burn?",
    options: [
      "Peel it off quickly",
      "Leave it in place",
      "Cut it away from the wound",
      "Soak in oil"
    ],
    correctAnswer: "Leave it in place"
  },
  {
    question: "In case of chemical burn, what should you do?",
    options: [
      "Rinse the affected area with plenty of water",
      "Apply ointment",
      "Cover with bandage immediately",
      "Neutralize with opposite chemical"
    ],
    correctAnswer: "Rinse the affected area with plenty of water"
  },
  {
    question: "What is the first step when someone has an electrical burn?",
    options: [
      "Turn off the power source",
      "Pour water on victim",
      "Pull them with bare hands",
      "Start CPR immediately"
    ],
    correctAnswer: "Turn off the power source"
  },
  {
    question: "How should you treat a small burn blister?",
    options: [
      "Leave it intact",
      "Pop it open",
      "Cover with oil",
      "Rub with ice"
    ],
    correctAnswer: "Leave it intact"
  },
  {
    question: "What is the best way to stop external bleeding?",
    options: [
      "Apply firm pressure with a clean cloth",
      "Elevate the injured limb only",
      "Rinse with cold water",
      "Wait for clotting naturally"
    ],
    correctAnswer: "Apply firm pressure with a clean cloth"
  },
  {
    question: "What is the danger of applying a tourniquet unnecessarily?",
    options: [
      "It can cause tissue and limb damage",
      "It stops bleeding faster",
      "It prevents clotting",
      "It heals the wound slower"
    ],
    correctAnswer: "It can cause tissue and limb damage"
  },
  {
    question: "If a foreign object is embedded in a wound, what should you do?",
    options: [
      "Do not remove it and stabilize object",
      "Pull it out quickly",
      "Push it further",
      "Ignore and bandage"
    ],
    correctAnswer: "Do not remove it and stabilize object"
  },
  {
    question: "What is the correct first aid for a knocked-out tooth?",
    options: [
      "Place it in milk and seek dental care",
      "Clean with soap and water",
      "Wrap in tissue and keep dry",
      "Ignore it"
    ],
    correctAnswer: "Place it in milk and seek dental care"
  },
  {
    question: "How long should you rinse a chemical splash in the eye?",
    options: [
      "5 minutes",
      "10 minutes",
      "15 minutes",
      "At least 20 minutes"
    ],
    correctAnswer: "At least 20 minutes"
  },
  {
    question: "What should you do if someone has a severe allergic reaction (anaphylaxis)?",
    options: [
      "Use an epinephrine auto-injector if available",
      "Give water",
      "Have them lie flat",
      "Wait for ambulance"
    ],
    correctAnswer: "Use an epinephrine auto-injector if available"
  },

  // --- 81 à 100 : Traumatismes, inconscience, autres urgences ---
  {
    question: "If a person faints, what should you do first?",
    options: [
      "Lay them flat and elevate legs",
      "Give them water immediately",
      "Shake them",
      "Perform CPR"
    ],
    correctAnswer: "Lay them flat and elevate legs"
  },
  {
    question: "What is the recovery position used for?",
    options: [
      "To keep airway open in unconscious but breathing victim",
      "To make CPR easier",
      "To stop bleeding",
      "To treat burns"
    ],
    correctAnswer: "To keep airway open in unconscious but breathing victim"
  },
  {
    question: "If someone has a suspected spinal injury, what should you avoid?",
    options: [
      "Moving the person unnecessarily",
      "Keeping head and neck aligned",
      "Calling emergency services",
      "Keeping them still"
    ],
    correctAnswer: "Moving the person unnecessarily"
  },
  {
    question: "What is the first step in treating someone in shock?",
    options: [
      "Lay the person down and elevate legs if possible",
      "Give them food",
      "Give them water",
      "Ask them to walk"
    ],
    correctAnswer: "Lay the person down and elevate legs if possible"
  },
  {
    question: "What should you never do if a person has a head injury?",
    options: [
      "Move them unnecessarily",
      "Call for medical help",
      "Keep them still",
      "Monitor breathing"
    ],
    correctAnswer: "Move them unnecessarily"
  },
  {
    question: "How do you help someone with a seizure?",
    options: [
      "Protect from injury and wait until seizure ends",
      "Hold them tightly",
      "Put something in their mouth",
      "Splash water"
    ],
    correctAnswer: "Protect from injury and wait until seizure ends"
  },
  {
    question: "What should you check after a seizure stops?",
    options: [
      "Breathing and responsiveness",
      "Blood pressure",
      "Temperature",
      "Pulse only"
    ],
    correctAnswer: "Breathing and responsiveness"
  },
  {
    question: "What is the most important step in heatstroke?",
    options: [
      "Cool the person rapidly",
      "Give hot drink",
      "Keep them wrapped in blankets",
      "Make them walk"
    ],
    correctAnswer: "Cool the person rapidly"
  },
  {
    question: "What is the immediate danger of hypothermia?",
    options: [
      "Cardiac arrest",
      "Headache",
      "Cough",
      "Fever"
    ],
    correctAnswer: "Cardiac arrest"
  },
  {
    question: "If someone is having chest pain lasting more than 10 minutes, what should you suspect?",
    options: [
      "Heart attack",
      "Indigestion",
      "Cough",
      "Anxiety"
    ],
    correctAnswer: "Heart attack"
  },
  {
    question: "What should you give someone having a suspected heart attack if available?",
    options: [
      "Aspirin (if not allergic)",
      "Paracetamol",
      "Water",
      "Antibiotic"
    ],
    correctAnswer: "Aspirin (if not allergic)"
  },
  {
    question: "What is the golden rule when approaching an emergency?",
    options: [
      "Ensure your own safety first",
      "Help the victim immediately",
      "Run towards the victim",
      "Ignore surroundings"
    ],
    correctAnswer: "Ensure your own safety first"
  },
  {
    question: "What should you do if you find someone lying on the ground but unsure if it is safe?",
    options: [
      "Do not approach until scene is safe",
      "Approach immediately",
      "Shake the victim",
      "Call them loudly and run"
    ],
    correctAnswer: "Do not approach until scene is safe"
  },
  {
    question: "If you suspect poisoning, what should you do first?",
    options: [
      "Call emergency services",
      "Give them water",
      "Induce vomiting",
      "Wait and see"
    ],
    correctAnswer: "Call emergency services"
  },
  {
    question: "What is the danger of carbon monoxide poisoning?",
    options: [
      "It is odorless and deadly",
      "It smells bad",
      "It causes cough only",
      "It is harmless"
    ],
    correctAnswer: "It is odorless and deadly"
  },
  {
    question: "How should you help someone with an asthma attack?",
    options: [
      "Help them use their inhaler",
      "Make them lie down",
      "Give them water",
      "Perform CPR immediately"
    ],
    correctAnswer: "Help them use their inhaler"
  },
  {
    question: "What should you do first if someone is unresponsive but breathing?",
    options: [
      "Place in recovery position",
      "Start CPR",
      "Give water",
      "Call their family"
    ],
    correctAnswer: "Place in recovery position"
  },
  {
    question: "What is the first priority in any first aid situation?",
    options: [
      "Check safety of rescuer and victim",
      "Call for help",
      "Give water",
      "Start CPR"
    ],
    correctAnswer: "Check safety of rescuer and victim"
  },
  {
    question: "How can you reassure a conscious victim?",
    options: [
      "Speak calmly and explain what you are doing",
      "Stay silent",
      "Shout for help near them",
      "Leave them alone"
    ],
    correctAnswer: "Speak calmly and explain what you are doing"
  },
  {
    question: "Why is calling emergency services crucial in any serious case?",
    options: [
      "Because trained professionals are needed",
      "Because bystanders can’t always solve everything",
      "Because time is critical",
      "All of the above"
    ],
    correctAnswer: "All of the above"
  }
  ];
  
  export default quizData;
  