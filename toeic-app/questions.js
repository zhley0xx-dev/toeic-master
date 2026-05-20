// TOEIC Reading Question Bank
// Parts: 5 (incomplete sentences), 6 (text completion), 7 (reading comprehension)
// Each day gets a unique seed to pick different questions

const QUESTION_BANK = {

  // ===================== PART 5: INCOMPLETE SENTENCES =====================
  part5: [
    // GRAMMAR - Verb tense
    {
      id:"p5_001", type:"part5", category:"Verb Tense",
      question: "The annual report _______ to all shareholders by the end of this quarter.",
      options:["will be sent","was sent","has sent","is sending"],
      answer:0, explanation:"Future passive: we need 'will be sent' because the action hasn't happened yet ('by the end of this quarter'). The passive is required since shareholders receive the report, they don't send it."
    },
    {
      id:"p5_002", type:"part5", category:"Verb Tense",
      question: "Ms. Chen _______ for the marketing firm since she graduated from university in 2015.",
      options:["works","worked","has been working","will work"],
      answer:2, explanation:"Present perfect continuous ('has been working') is used for an action that started in the past and continues to the present. The clue is 'since 2015' — she started then and still works there."
    },
    {
      id:"p5_003", type:"part5", category:"Verb Tense",
      question: "The construction team _______ the bridge by the time the mayor arrives for the ceremony.",
      options:["will have completed","completes","has completed","will complete"],
      answer:0, explanation:"Future perfect ('will have completed') is used for an action that will be finished before a specific future time. 'By the time the mayor arrives' indicates the completion precedes that future event."
    },
    {
      id:"p5_004", type:"part5", category:"Verb Tense",
      question: "If the proposal _______ on time, the committee would have approved it last month.",
      options:["had arrived","arrived","would arrive","arrives"],
      answer:0, explanation:"Third conditional: 'If + past perfect, would have + past participle'. This expresses an unreal condition in the past. 'Had arrived' is required in the if-clause."
    },
    // GRAMMAR - Word form
    {
      id:"p5_005", type:"part5", category:"Word Form",
      question: "The CEO gave a _______ speech that inspired all employees to work harder.",
      options:["motivate","motivation","motivational","motivated"],
      answer:2, explanation:"We need an adjective to modify the noun 'speech'. 'Motivational' is the adjective form. 'Motivation' is a noun, 'motivate' is a verb, and 'motivated' would mean the speech itself was motivated — which doesn't fit logically."
    },
    {
      id:"p5_006", type:"part5", category:"Word Form",
      question: "All employees are required to act _______ in their dealings with clients.",
      options:["profession","professional","professionally","professionalism"],
      answer:2, explanation:"An adverb is needed to modify the verb 'act'. 'Professionally' is the adverb form of 'professional'. Remember: adverbs typically end in -ly and modify verbs, adjectives, or other adverbs."
    },
    {
      id:"p5_007", type:"part5", category:"Word Form",
      question: "The company's _______ in the Asian market has exceeded all expectations.",
      options:["expand","expanding","expansion","expanded"],
      answer:2, explanation:"A noun is needed after the possessive 'company's'. 'Expansion' is the noun form. The structure [possessive] + [noun] confirms we need a noun here."
    },
    {
      id:"p5_008", type:"part5", category:"Word Form",
      question: "Customers should _______ any defective products within 30 days of purchase.",
      options:["return","returns","returned","returning"],
      answer:0, explanation:"After 'should', we need the base form of the verb (modal + infinitive). 'Return' is correct. Modals (should, can, will, must, etc.) are always followed by the base infinitive."
    },
    // GRAMMAR - Prepositions
    {
      id:"p5_009", type:"part5", category:"Prepositions",
      question: "The conference room is available _______ reservation only.",
      options:["by","on","for","with"],
      answer:0, explanation:"'By reservation' is a fixed collocation meaning you need to make a reservation. Compare: 'by appointment', 'by request'. The preposition 'by' here indicates the method or means."
    },
    {
      id:"p5_010", type:"part5", category:"Prepositions",
      question: "Please submit your application _______ the deadline of May 31st.",
      options:["until","before","by","during"],
      answer:2, explanation:"'By' indicates a deadline — the action must happen no later than that time. 'Until' implies a continuous action up to that point. 'Before' could work but 'by' is the standard business English usage for deadlines."
    },
    {
      id:"p5_011", type:"part5", category:"Prepositions",
      question: "The new policy applies _______ all full-time employees regardless of department.",
      options:["at","for","to","on"],
      answer:2, explanation:"'Apply to' is the correct phrasal combination. A rule or policy 'applies to' people or situations. This is a fixed collocation in business English."
    },
    // VOCABULARY
    {
      id:"p5_012", type:"part5", category:"Vocabulary",
      question: "The board of directors voted to _______ the merger after months of negotiation.",
      options:["approve","appoint","acquire","anticipate"],
      answer:0, explanation:"'Approve' means to give official agreement or authorization. The board votes to 'approve' decisions. 'Appoint' means to assign a role, 'acquire' means to obtain, 'anticipate' means to expect — none fit a merger vote context."
    },
    {
      id:"p5_013", type:"part5", category:"Vocabulary",
      question: "Workers must wear _______ equipment, including hard hats and safety goggles.",
      options:["protective","productive","preventive","progressive"],
      answer:0, explanation:"'Protective equipment' is the standard term for safety gear (PPE - Personal Protective Equipment). This is a fixed collocation used in workplace safety contexts on the TOEIC."
    },
    {
      id:"p5_014", type:"part5", category:"Vocabulary",
      question: "The marketing team will _______ a survey to assess customer satisfaction levels.",
      options:["conduct","control","contribute","convey"],
      answer:0, explanation:"'Conduct a survey' is the standard business collocation. You 'conduct' research, interviews, meetings, and surveys. 'Control' means to manage, 'contribute' means to give, 'convey' means to communicate."
    },
    {
      id:"p5_015", type:"part5", category:"Vocabulary",
      question: "The software _______ will be released next month after final testing is complete.",
      options:["update","upgrade","upload","underline"],
      answer:0, explanation:"A software 'update' is a new version with improvements or fixes. 'Upgrade' typically implies a more significant improvement, often paid. In context of a company release after testing, 'update' is the most natural term."
    },
    // GRAMMAR - Relative pronouns
    {
      id:"p5_016", type:"part5", category:"Relative Pronouns",
      question: "The candidate _______ résumé impressed the hiring manager was called for an interview.",
      options:["who","whom","whose","which"],
      answer:2, explanation:"'Whose' is used as a possessive relative pronoun. It replaces 'his/her/their' and refers to people. Here, 'whose résumé' = 'the candidate's résumé'. Whose shows possession and works with both people and things."
    },
    {
      id:"p5_017", type:"part5", category:"Relative Pronouns",
      question: "The factory _______ was built in 1985 is scheduled for renovation.",
      options:["who","whom","whose","that"],
      answer:3, explanation:"'That' is used to introduce a relative clause modifying a thing (factory). 'Which' would also be acceptable, but 'that' is preferred in restrictive clauses. 'Who/whom' are for people only."
    },
    // GRAMMAR - Conjunctions
    {
      id:"p5_018", type:"part5", category:"Conjunctions",
      question: "_______ the project was completed on time, the client was not satisfied with the results.",
      options:["Although","Because","Therefore","However"],
      answer:0, explanation:"'Although' introduces a contrast clause — the project was done on time (positive), but the client wasn't satisfied (negative). 'Because' shows cause. 'Therefore' and 'However' are adverbs, not conjunctions, so they can't begin a clause."
    },
    {
      id:"p5_019", type:"part5", category:"Conjunctions",
      question: "You must submit the form _______ online or in person at our main office.",
      options:["both","either","neither","whether"],
      answer:1, explanation:"'Either...or' presents two alternatives. 'Either online or in person' shows a choice between two methods. 'Both...and' would require both to happen simultaneously. 'Neither...nor' is negative."
    },
    // GRAMMAR - Pronouns
    {
      id:"p5_020", type:"part5", category:"Pronouns",
      question: "All team members should introduce _______ at the beginning of the conference call.",
      options:["them","they","themselves","their"],
      answer:2, explanation:"Reflexive pronoun: when the subject and object are the same people, use a reflexive pronoun (-self/-selves). 'Team members introduce themselves' — they perform the action on themselves."
    },
    // GRAMMAR - Modals
    {
      id:"p5_021", type:"part5", category:"Modal Verbs",
      question: "Visitors _______ sign in at the reception desk upon arrival at the building.",
      options:["could","should","might","used to"],
      answer:1, explanation:"'Should' expresses obligation or recommendation. In signs and instructions, 'should' is used for required actions. 'Must' would be stronger (mandatory). 'Could' and 'might' express possibility, not obligation."
    },
    {
      id:"p5_022", type:"part5", category:"Modal Verbs",
      question: "The quarterly figures look strong; profits _______ increase by at least 15%.",
      options:["should","could","must","would"],
      answer:0, explanation:"'Should' expresses expectation based on evidence. Given that 'quarterly figures look strong', profits 'should' (are expected to) increase. 'Must' expresses logical certainty. 'Could' expresses possibility, weaker than expectation."
    },
    // VOCABULARY - Business collocations
    {
      id:"p5_023", type:"part5", category:"Business Vocabulary",
      question: "The company needs to _______ costs without affecting product quality.",
      options:["reduce","refuse","remove","replace"],
      answer:0, explanation:"'Reduce costs' is a standard business collocation meaning to decrease expenses. 'Refuse costs' doesn't make sense, 'remove' means to eliminate entirely (too strong), 'replace' means to substitute."
    },
    {
      id:"p5_024", type:"part5", category:"Business Vocabulary",
      question: "Employees are encouraged to _______ new ideas during the brainstorming session.",
      options:["put forward","put off","put down","put up"],
      answer:0, explanation:"'Put forward' means to propose or suggest an idea. 'Put off' = postpone, 'put down' = write down or criticize, 'put up' = display or tolerate. 'Put forward ideas' is a common business English expression."
    },
    {
      id:"p5_025", type:"part5", category:"Word Form",
      question: "The new software system proved to be highly _______ in managing inventory.",
      options:["effect","effective","effectively","effectiveness"],
      answer:1, explanation:"An adjective is needed after the linking verb 'proved to be'. 'Effective' is the adjective meaning producing the desired result. 'Effect' is a noun/verb, 'effectively' is an adverb, 'effectiveness' is a noun."
    },
    // More Part 5
    {
      id:"p5_026", type:"part5", category:"Prepositions",
      question: "The seminar will focus _______ the latest trends in digital marketing.",
      options:["at","in","on","about"],
      answer:2, explanation:"'Focus on' is a fixed phrasal verb collocation. You always 'focus ON' something. This is one of the most important phrasal verbs in business English."
    },
    {
      id:"p5_027", type:"part5", category:"Verb Tense",
      question: "By the time you read this memo, the decision _______ already.",
      options:["made","will be made","will have been made","has been made"],
      answer:2, explanation:"Future perfect passive: 'will have been made'. When we say 'by the time you [present action]', the other action is future perfect — it will be completed before that point."
    },
    {
      id:"p5_028", type:"part5", category:"Vocabulary",
      question: "The restaurant received numerous _______ from satisfied customers after the renovation.",
      options:["complements","compliments","complaints","companions"],
      answer:1, explanation:"'Compliments' (noun) = expressions of praise. 'Complements' = things that complete something. 'Satisfied customers' giving positive feedback = compliments. Don't confuse compliment/complement — a classic TOEIC trap."
    },
    {
      id:"p5_029", type:"part5", category:"Word Form",
      question: "Our company offers a _______ guarantee on all electronic products.",
      options:["comprehend","comprehensive","comprehension","comprehensively"],
      answer:1, explanation:"An adjective is needed before the noun 'guarantee'. 'Comprehensive' means covering all aspects, complete. It's a very common TOEIC adjective in business contexts: comprehensive plan, comprehensive insurance."
    },
    {
      id:"p5_030", type:"part5", category:"Conjunctions",
      question: "Please notify the IT department _______ you encounter any technical difficulties.",
      options:["while","whenever","however","moreover"],
      answer:1, explanation:"'Whenever' means 'every time that' — it's used for actions that should happen every time a condition occurs. 'While' = at the same time, 'however' and 'moreover' are adverbs used between sentences."
    },
  ],

  // ===================== PART 6: TEXT COMPLETION =====================
  part6: [
    {
      id:"p6_001", type:"part6", category:"Text Completion",
      passage: "Dear Mr. Thompson,\n\nThank you for attending our product launch event last Thursday. We are pleased to inform you that the [BLANK1] of our new software platform has been highly successful, with over 500 companies already expressing interest.\n\nWe would like to invite you to [BLANK2] our exclusive webinar next week, where our team of experts will provide a detailed demonstration. Participation is free, but [BLANK3] is required due to limited capacity.\n\nWe look forward to your response.",
      questions:[
        { qid:"p6_001a", blank:"BLANK1", question:"Which word fits BLANK1?", options:["launch","launching","launched","to launch"], answer:0, explanation:"'Launch' as a noun is needed after 'the' and before 'of'. 'The launch of our platform' — this is a noun phrase structure. A noun follows 'the' in this position." },
        { qid:"p6_001b", blank:"BLANK2", question:"Which word fits BLANK2?", options:["attend","attending","attended","attendance"], answer:0, explanation:"After 'invite you to', we need the base infinitive: 'invite + object + to + infinitive'. So 'to attend' — the 'to' is already in the sentence, so we add 'attend'." },
        { qid:"p6_001c", blank:"BLANK3", question:"Which word fits BLANK3?", options:["register","registration","registered","registering"], answer:1, explanation:"A noun is needed here as the subject of the clause 'is required'. 'Registration is required' — 'registration' is the noun. 'Register' is a verb, 'registered' is past participle, 'registering' is present participle." }
      ]
    },
    {
      id:"p6_002", type:"part6", category:"Text Completion",
      passage: "INTERNAL MEMO\n\nTo: All Staff\nFrom: HR Department\nRe: New Parking Policy\n\nEffective [BLANK1] January 1st, all employees must register their vehicles with the security office. Parking passes will be [BLANK2] to staff members upon verification of vehicle registration documents.\n\nAny vehicle found [BLANK3] a valid pass will be subject to removal at the owner's expense. Please contact HR if you have any questions.",
      questions:[
        { qid:"p6_002a", blank:"BLANK1", question:"Which word fits BLANK1?", options:["from","since","until","during"], answer:0, explanation:"'Effective from [date]' means starting from that date. 'From January 1st' indicates the start date of the policy. 'Since' is used with present/past perfect, 'until' shows an end point, 'during' needs a period." },
        { qid:"p6_002b", blank:"BLANK2", question:"Which word fits BLANK2?", options:["given","giving","give","to give"], answer:0, explanation:"After 'will be', we need a past participle to form the future passive: 'will be given'. Passes are distributed by someone to employees — passive voice is appropriate." },
        { qid:"p6_002c", blank:"BLANK3", question:"Which word fits BLANK3?", options:["without","lacking","absent","missed"], answer:0, explanation:"'Without a valid pass' is the correct preposition phrase. 'Found without' means the vehicle doesn't have a pass. 'Lacking' is possible but 'without' is more idiomatic in formal notices." }
      ]
    },
    {
      id:"p6_003", type:"part6", category:"Text Completion",
      passage: "Greenfield Technology Solutions is [BLANK1] seeking qualified candidates for the position of Senior Project Manager. The ideal candidate will have a minimum of five years of experience in software project management and demonstrated leadership skills.\n\nApplicants must be [BLANK2] to travel domestically up to 30% of the time. Proficiency in project management software is [BLANK3] required.\n\nInterested candidates should send their résumé and cover letter to careers@greenfield.com.",
      questions:[
        { qid:"p6_003a", blank:"BLANK1", question:"Which word fits BLANK1?", options:["current","currently","currency","currents"], answer:1, explanation:"An adverb is needed to modify the adjective 'seeking'. 'Currently seeking' means seeking at this time. 'Current' is an adjective (needs a noun after it), 'currency' and 'currents' are nouns." },
        { qid:"p6_003b", blank:"BLANK2", question:"Which word fits BLANK2?", options:["willing","willingness","willed","willingly"], answer:0, explanation:"After 'must be', we need an adjective: 'must be willing to travel'. 'Willing' means ready and happy to do something. 'Willingness' is a noun, 'willingly' is an adverb." },
        { qid:"p6_003c", blank:"BLANK3", question:"Which word fits BLANK3?", options:["as well","also","additionally","furthermore"], answer:1, explanation:"'Also' is an adverb used mid-sentence before the verb to add information. 'As well' comes at the end of a sentence. 'Additionally' and 'furthermore' are used at the start of new sentences." }
      ]
    },
  ],

  // ===================== PART 7: READING COMPREHENSION =====================
  part7: [
    // Email
    {
      id:"p7_001", type:"part7", category:"Email / Correspondence",
      passage: `From: sarah.mills@techcorp.com
To: david.chen@techcorp.com
Date: March 14
Subject: Team Meeting Rescheduled

Hi David,

I'm writing to let you know that the project status meeting originally scheduled for Wednesday, March 16 at 2:00 PM has been moved to Thursday, March 17 at 10:00 AM. The conference room booking remains the same — Room 4B on the third floor.

This change was necessary because Ms. Yamamoto, our project sponsor, has a conflicting commitment on Wednesday afternoon. Her attendance is essential as we will be reviewing the Q1 budget allocation.

Please confirm your availability for the new time, and forward this message to any team members who may not be on this email chain. If Thursday does not work for you, please contact me by end of day Tuesday so we can make alternative arrangements.

Best regards,
Sarah`,
      questions:[
        { qid:"p7_001a", question:"Why was the meeting rescheduled?", options:["The conference room was unavailable","David Chen had a conflict","Ms. Yamamoto had a prior commitment","The budget review was postponed"], answer:2, explanation:"The email states: 'This change was necessary because Ms. Yamamoto, our project sponsor, has a conflicting commitment on Wednesday afternoon.' — Ms. Yamamoto's conflict caused the reschedule." },
        { qid:"p7_001b", question:"What is the new meeting time?", options:["Wednesday at 2:00 PM","Thursday at 2:00 PM","Thursday at 10:00 AM","Wednesday at 10:00 AM"], answer:2, explanation:"Sarah explicitly states: 'moved to Thursday, March 17 at 10:00 AM'." },
        { qid:"p7_001c", question:"What does Sarah ask David to do?", options:["Book a new conference room","Contact Ms. Yamamoto directly","Confirm availability and forward the message","Prepare the Q1 budget report"], answer:2, explanation:"Sarah asks: 'Please confirm your availability for the new time, and forward this message to any team members who may not be on this email chain.'" }
      ]
    },
    // Advertisement
    {
      id:"p7_002", type:"part7", category:"Advertisement",
      passage: `GRAND OPENING SPECIAL

HARVEST KITCHEN & WINE BAR
Now Open in the Westfield Business District

Celebrate with us during our first month and enjoy:
• 20% off all menu items (weekdays only, dine-in)
• Complimentary glass of house wine with any main course on Fridays
• Private dining available for corporate events (8–40 guests)

Hours: Monday–Friday 11:30 AM–10:00 PM
       Saturday–Sunday 10:00 AM–11:00 PM

Reservations recommended. Walk-ins welcome, subject to availability.
Visit harvestkitchen.com or call (555) 820-4400

*Promotional prices valid through April 30th only. Cannot be combined with other offers.`,
      questions:[
        { qid:"p7_002a", question:"When is the 20% discount available?", options:["Every day of the week","Weekdays only, for dine-in customers","Weekends only","On Fridays with a main course"], answer:1, explanation:"The flyer states '20% off all menu items (weekdays only, dine-in)'. This discount is restricted to weekdays and requires dining in the restaurant." },
        { qid:"p7_002b", question:"What is offered on Fridays?", options:["20% discount on all items","Free dessert with main course","Complimentary glass of house wine","Free private dining"], answer:2, explanation:"The promotion states 'Complimentary glass of house wine with any main course on Fridays'." },
        { qid:"p7_002c", question:"What is indicated about the promotions?", options:["They are available year-round","They cannot be used together","They apply to takeout orders","They include delivery service"], answer:1, explanation:"The fine print states: 'Cannot be combined with other offers.' This means the promotions cannot be used simultaneously." }
      ]
    },
    // Article / Notice
    {
      id:"p7_003", type:"part7", category:"Notice / Announcement",
      passage: `NOTICE TO ALL BUILDING OCCUPANTS

Riverside Tower – Elevator Maintenance Schedule

The building management would like to inform all tenants that Elevator No. 2 (east wing) will be undergoing scheduled maintenance from Monday, April 3 through Wednesday, April 5. During this period, the elevator will be completely out of service.

Elevator No. 1 (west wing) will remain fully operational and available to all residents and visitors. The freight elevator on the lower level will also be available for use by appointment only, for moving large items.

We apologize for any inconvenience this may cause. Tenants requiring assistance with mobility should contact building management at extension 201 no later than this Friday to make special arrangements.

The maintenance work is necessary to comply with current municipal safety regulations and to ensure the continued reliable operation of the building's elevator system.

Building Management Office`,
      questions:[
        { qid:"p7_003a", question:"How long will Elevator No. 2 be out of service?", options:["One day","Two days","Three days","One week"], answer:2, explanation:"The notice says maintenance runs 'from Monday, April 3 through Wednesday, April 5' — that's Monday, Tuesday, Wednesday = three days." },
        { qid:"p7_003b", question:"What is true about the freight elevator?", options:["It will not be available during maintenance","It requires an appointment to use","It is located on the top floor","It is only for building staff"], answer:1, explanation:"The notice states the freight elevator 'will also be available for use by appointment only'. Tenants must schedule in advance to use it." },
        { qid:"p7_003c", question:"Why is the maintenance being performed?", options:["To add new elevator features","To replace old elevator parts","To comply with safety regulations","To reduce operating costs"], answer:2, explanation:"The notice explains: 'The maintenance work is necessary to comply with current municipal safety regulations and to ensure continued reliable operation.'" }
      ]
    },
    // Business report / memo
    {
      id:"p7_004", type:"part7", category:"Business Report",
      passage: `QUARTERLY SALES PERFORMANCE SUMMARY
Q4 – Regional Division

Overall, Q4 demonstrated strong performance across most product categories. Total revenue reached $4.2 million, representing a 12% increase over Q3 and an 18% increase year-over-year. The electronics division was the top performer, contributing 38% of total revenue.

However, the office supplies segment showed a decline of 8% compared to Q3, primarily due to increased competition from online retailers. The team has proposed a price adjustment strategy to be implemented in Q1 to address this shortfall.

The Southwest territory recorded the highest growth at 24%, while the Northeast remained flat at 0.3% growth. Regional manager Andrea Foster will present a detailed action plan for the Northeast at next month's executive meeting.

Customer satisfaction scores improved overall, with 87% of surveyed clients rating their experience as "excellent" or "very good" — a 5-point improvement from Q3.`,
      questions:[
        { qid:"p7_004a", question:"What was the revenue compared to Q3?", options:["It decreased by 12%","It increased by 12%","It increased by 18%","It remained unchanged"], answer:1, explanation:"The report states: 'Total revenue reached $4.2 million, representing a 12% increase over Q3'. The 18% figure refers to year-over-year comparison, not Q3." },
        { qid:"p7_004b", question:"What is mentioned about office supplies?", options:["It was the top performing segment","Sales increased by 8%","It declined due to online competition","It will be discontinued in Q1"], answer:2, explanation:"The report says: 'the office supplies segment showed a decline of 8% compared to Q3, primarily due to increased competition from online retailers.'" },
        { qid:"p7_004c", question:"What will happen at the executive meeting next month?", options:["The Q4 report will be published","Andrea Foster will present a Northeast plan","The electronics division will be reviewed","A new price strategy will be approved"], answer:1, explanation:"'Regional manager Andrea Foster will present a detailed action plan for the Northeast at next month's executive meeting.'" }
      ]
    },
    // Double passage
    {
      id:"p7_005", type:"part7", category:"Double Passage",
      passage: `TEXT 1 – ONLINE REVIEW (Posted on TechReviews.com)
★★★★☆ (4/5)

I've been using the Zenith X200 laptop for three months and I'm generally very impressed. The battery life is exceptional — easily 10+ hours with normal use. The keyboard is comfortable and the display is sharp and bright. My only complaint is that it runs a bit hot under heavy workloads, but for everyday tasks like documents and video calls, it performs flawlessly. Would recommend for business users.
— Posted by User: K.Hartley

TEXT 2 – EMAIL RESPONSE FROM ZENITH SUPPORT
Dear K. Hartley,

Thank you for your review of the Zenith X200. We're delighted to hear about your positive experience with the battery performance and display quality.

Regarding the heat issue you mentioned: this is a known behavior under sustained CPU load. We recommend using our Zenith PowerControl utility (available as a free download from our support page) to manage performance profiles. Setting the device to "Balanced" mode significantly reduces heat output without noticeable impact on performance for most standard tasks.

Please don't hesitate to contact us if you have any further questions.

Zenith Customer Support`,
      questions:[
        { qid:"p7_005a", question:"What does K. Hartley praise about the laptop?", options:["Its lightweight design","Its battery life and display","Its processing speed","Its price and value"], answer:1, explanation:"The review mentions 'battery life is exceptional' and 'the display is sharp and bright' as positive points. These are explicitly praised." },
        { qid:"p7_005b", question:"What solution does Zenith Support offer for the heat problem?", options:["A free hardware replacement","An updated laptop model","A software utility to manage performance","A full refund"], answer:2, explanation:"Support recommends: 'our Zenith PowerControl utility (available as a free download) to manage performance profiles.' This is a software solution." },
        { qid:"p7_005c", question:"What can be inferred from the two texts?", options:["K. Hartley returned the laptop","Zenith monitors customer reviews","The X200 has been discontinued","K. Hartley contacted support directly"], answer:1, explanation:"Zenith Support directly responded to the online review, which implies the company monitors public review platforms to address customer feedback." }
      ]
    },
    // More part 7 passages
    {
      id:"p7_006", type:"part7", category:"Email / Correspondence",
      passage: `From: facilities@globalbank.com
To: All Staff
Subject: Office Relocation – Action Required

Dear colleagues,

As previously announced, our main offices will relocate to the new Global Bank Tower on Harbor Boulevard beginning July 1st. The move will be phased: floors 12–15 will move during the week of July 1, and floors 7–11 the following week.

All personal items must be packed in labeled boxes by June 25th. Facilities will provide boxes and packing materials from Room 101 starting June 18th. IT equipment (computers, monitors, phones) will be handled by the IT team — do not pack these yourself.

Parking at the new location will be covered for all staff for the first 30 days. After that, monthly parking passes may be purchased through HR at a subsidized rate.

For questions, contact relocation@globalbank.com.`,
      questions:[
        { qid:"p7_006a", question:"When must personal items be packed by?", options:["July 1st","June 25th","June 18th","July 15th"], answer:1, explanation:"The email states: 'All personal items must be packed in labeled boxes by June 25th.'" },
        { qid:"p7_006b", question:"What is stated about IT equipment?", options:["Staff must pack it themselves","It should be left on desks","The IT team will handle it","It should be sent in advance"], answer:2, explanation:"'IT equipment (computers, monitors, phones) will be handled by the IT team — do not pack these yourself.' Staff are explicitly told NOT to pack IT equipment." },
        { qid:"p7_006c", question:"What is offered for the first 30 days at the new location?", options:["Free lunch vouchers","Covered parking","Subsidized public transit","A relocation bonus"], answer:1, explanation:"'Parking at the new location will be covered for all staff for the first 30 days.' — free parking is the benefit for the initial period." }
      ]
    },
  ],

  // Additional Part 5 questions to ensure variety
  part5_extra: [
    { id:"p5_031", type:"part5", category:"Verb Tense", question:"The new policy _______ into effect next Monday.", options:["will go","went","has gone","going"], answer:0, explanation:"Future simple 'will go' is needed because 'next Monday' indicates a future time." },
    { id:"p5_032", type:"part5", category:"Word Form", question:"The company needs to hire more _______ staff to handle customer inquiries.", options:["experience","experienced","experiencing","experiential"], answer:1, explanation:"Adjective 'experienced' modifies the noun 'staff'. Past participles used as adjectives describe a permanent characteristic." },
    { id:"p5_033", type:"part5", category:"Prepositions", question:"The meeting was postponed _______ a scheduling conflict.", options:["due to","because","since","as"], answer:0, explanation:"'Due to' is a prepositional phrase followed by a noun. 'Because', 'since', and 'as' are conjunctions followed by clauses with verbs." },
    { id:"p5_034", type:"part5", category:"Vocabulary", question:"The architect submitted a detailed _______ for the new office complex.", options:["proposal","propose","proposed","proposing"], answer:0, explanation:"A noun is needed after 'a detailed'. 'Proposal' is the noun form meaning a plan or suggestion submitted for consideration." },
    { id:"p5_035", type:"part5", category:"Conjunctions", question:"The store will remain open _______ the renovation work is completed.", options:["until","since","although","unless"], answer:0, explanation:"'Until' means 'up to the time that' — the store stays open right up to when the renovation finishes." },
    { id:"p5_036", type:"part5", category:"Business Vocabulary", question:"All travel expenses must be _______ by receipts before reimbursement.", options:["supported","sustained","submitted","substituted"], answer:0, explanation:"'Supported by receipts' means documented with evidence. In business English, expenses are 'supported' by documentation." },
    { id:"p5_037", type:"part5", category:"Word Form", question:"Please handle this matter with the utmost _______.", options:["discreet","discretion","discreetly","discrete"], answer:1, explanation:"After 'with the utmost', a noun is needed: 'utmost discretion'. 'Discreet' means careful about revealing secrets (adjective), 'discrete' means separate/distinct — don't confuse these!" },
    { id:"p5_038", type:"part5", category:"Relative Pronouns", question:"The report _______ was submitted last week needs to be revised.", options:["who","whose","that","what"], answer:2, explanation:"'That' introduces a relative clause for a thing (report). 'Which' also works, but 'that' is standard in restrictive clauses." },
    { id:"p5_039", type:"part5", category:"Verb Tense", question:"By 2026, the company _______ three new branches in Asia.", options:["opens","will have opened","has opened","opened"], answer:1, explanation:"'By 2026' signals future perfect: 'will have opened' — an action completed before a specific future point." },
    { id:"p5_040", type:"part5", category:"Vocabulary", question:"The factory operates 24 hours a day to meet _______ demand.", options:["growing","growth","grow","grown"], answer:0, explanation:"An adjective is needed to modify the noun 'demand'. 'Growing demand' means demand that is increasing." },
  ]
};

// ============================================================
// DAILY QUIZ GENERATOR
// Generates a unique 50-question quiz based on the day number
// ============================================================
function generateDailyQuiz(dayNumber) {
  // Use dayNumber as a deterministic seed
  const seed = dayNumber * 7919; // large prime for distribution
  const rng = seededRandom(seed);
  
  const questions = [];
  
  // TOEIC Reading distribution (adapted for 50 Qs):
  // Part 5: ~24 questions (incomplete sentences)
  // Part 6: ~9 questions (text completion, 3 passages × 3 Qs)
  // Part 7: ~17 questions (reading comprehension)
  
  // --- Build pool ---
  const p5pool = [...QUESTION_BANK.part5, ...QUESTION_BANK.part5_extra];
  const p6pool = [...QUESTION_BANK.part6];
  const p7pool = [...QUESTION_BANK.part7];
  
  // Shuffle using seeded RNG
  const shuffledP5 = shuffleWithRng(p5pool, rng);
  const shuffledP6 = shuffleWithRng(p6pool, rng);
  const shuffledP7 = shuffleWithRng(p7pool, rng);
  
  // Pick Part 5 — 24 questions, cycling if needed
  for (let i = 0; i < 24; i++) {
    const q = shuffledP5[i % shuffledP5.length];
    // Rotate options based on day to prevent memorization
    questions.push(transformQ5(q, dayNumber + i));
  }
  
  // Pick Part 6 — up to 3 passages (9 Qs total)
  const p6count = Math.min(3, shuffledP6.length);
  for (let i = 0; i < p6count; i++) {
    const passage = shuffledP6[i % shuffledP6.length];
    passage.questions.forEach(sq => {
      questions.push({ ...sq, passageText: passage.passage, type: "part6", passageId: passage.id });
    });
  }
  
  // Pick Part 7 — passages providing ~17 Qs
  let p7count = 0;
  const p7shuffled = shuffledP7;
  let pi = 0;
  while (p7count < 17 && pi < p7shuffled.length * 2) {
    const passage = p7shuffled[pi % p7shuffled.length];
    passage.questions.forEach(sq => {
      if (p7count < 17) {
        questions.push({ ...sq, passageText: passage.passage, type: "part7", passageId: passage.id, passageCategory: passage.category });
        p7count++;
      }
    });
    pi++;
  }
  
  // Ensure exactly 50 questions
  while (questions.length < 50) {
    const extra = shuffledP5[questions.length % shuffledP5.length];
    questions.push(transformQ5(extra, dayNumber + questions.length + 100));
  }
  
  return questions.slice(0, 50);
}

function transformQ5(q, seed) {
  // Rotate options so answers are never in the same position every day
  const rng = seededRandom(seed * 13);
  const rotations = Math.floor(rng() * 4);
  const newOptions = rotateArray([...q.options], rotations);
  const newAnswer = (q.answer + (4 - rotations)) % 4;
  return { ...q, options: newOptions, answer: newAnswer, uid: q.id + '_' + seed };
}

function rotateArray(arr, n) {
  const r = n % arr.length;
  return [...arr.slice(r), ...arr.slice(0, r)];
}

function seededRandom(seed) {
  let s = seed;
  return function() {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return ((s >>> 0) / 0xffffffff);
  };
}

function shuffleWithRng(arr, rng) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
