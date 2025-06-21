document.addEventListener('DOMContentLoaded', () => {
    // --- Configuration ---
    const TOTAL_EXAM_TIME_MINUTES = 90; // Standard RBT exam time allowance can vary. Adjust as needed.
    const PASSING_PERCENTAGE = 80;

    // --- DOM Elements ---
    const quizArea = document.getElementById('quiz-area');
    const resultsArea = document.getElementById('results-area');
    const reviewArea = document.getElementById('review-area');
    const questionTextEl = document.getElementById('question-text');
    const optionsListEl = document.getElementById('options-list');
    const questionNumberEl = document.getElementById('question-number');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const finishBtn = document.getElementById('finish-btn');
    const timeEl = document.getElementById('time');
    const scorePercentageEl = document.getElementById('score-percentage');
    const scoreActualEl = document.getElementById('score-actual');
    const totalQuestionsEl = document.getElementById('total-questions');
    const passFailMessageEl = document.getElementById('pass-fail-message');
    const resultSummaryEl = document.getElementById('result-summary');
    const restartBtn = document.getElementById('restart-btn');
    const reviewAnswersBtn = document.getElementById('review-answers-btn');
    const reviewContentEl = document.getElementById('review-content');
    const backToResultsBtn = document.getElementById('back-to-results-btn');
    const progressBar = document.getElementById('progress-bar');

    // --- Question Bank (100 Questions) ---
    // This is the most crucial part. The quality of these questions determines the exam's usefulness.
    // I'll provide a structure and fill in with RBT-relevant questions.
    // Categories are loosely based on RBT Task List areas.
    const questionBank = [
        // Measurement
        { question: "Which of the following is an example of a continuous measurement procedure?", options: ["ABC Data", "Duration Recording", "Permanent Product Recording", "Momentary Time Sampling"], correctAnswer: 1 },
        { question: "An RBT is tracking how long it takes for a student to begin a task after the instruction is given. This is an example of:", options: ["Latency Recording", "Duration Recording", "Frequency Recording", "Interresponse Time (IRT)"], correctAnswer: 0 },
        { question: "If behavior is defined as 'any observable and measurable act of an organism,' which of the following is the BEST example of a behavior?", options: ["Frustration", "Hitting a peer", "Thinking about candy", "Being happy"], correctAnswer: 1 },
        { question: "Permanent product recording is most appropriate when:", options: ["The behavior occurs at a very high rate.", "The behavior leaves a consistent, observable result.", "The RBT wants to measure the time between behaviors.", "The behavior is fleeting and quick."], correctAnswer: 1 },
        { question: "Partial interval recording tends to _________ the occurrence of behavior.", options: ["Underestimate", "Accurately estimate", "Overestimate", "Be unrelated to"], correctAnswer: 2 },
        { question: "Whole interval recording is best used for behaviors you want to:", options: ["Increase", "Decrease", "Maintain", "Fade"], correctAnswer: 0 },
        { question: "An RBT observes a client during a 10-minute period. She divides the period into 1-minute intervals and records if the behavior occurred at any point during each interval. This is:", options: ["Momentary Time Sampling", "Whole Interval Recording", "Partial Interval Recording", "Frequency Recording"], correctAnswer: 2 },
        { question: "When graphing data, the vertical axis typically represents:", options: ["Time/Sessions", "The behavior being measured", "Phases/Conditions", "The independent variable"], correctAnswer: 1 },
        { question: "A trend on a graph that shows behavior increasing over time is called an:", options: ["Ascending trend", "Descending trend", "Variable trend", "Stable trend"], correctAnswer: 0 },
        { question: "Interobserver Agreement (IOA) is important to ensure:", options: ["The behavior plan is effective", "The data is believable and reliable", "The client is making progress", "The RBT is working enough hours"], correctAnswer: 1 },

        // Assessment
        { question: "A preference assessment where the individual is presented with multiple items at once and allowed to choose one is a:", options: ["Single Stimulus Preference Assessment", "Paired Stimulus Preference Assessment", "Multiple Stimulus Without Replacement (MSWO)", "Free Operant Observation"], correctAnswer: 2 },
        { question: "Functional Behavior Assessments (FBAs) are used to:", options: ["Diagnose developmental disabilities", "Determine the function of a behavior", "Prescribe medication for behavior problems", "Teach new academic skills"], correctAnswer: 1 },
        { question: "The four common functions of behavior are:", options: ["Attention, Escape, Tangible, Sensory", "Anger, Frustration, Sadness, Joy", "Compliance, Non-compliance, Aggression, Self-injury", "Reinforcement, Punishment, Extinction, Prompts"], correctAnswer: 0 },
        { question: "An RBT's role in a formal FBA typically involves:", options: ["Designing the FBA protocol", "Conducting direct observation and collecting data", "Interpreting FBA results and writing the report", "Developing the behavior intervention plan"], correctAnswer: 1 },
        { question: "Which assessment method involves direct manipulation of antecedents and consequences to determine a behavior's function?", options: ["Indirect Assessment (Interviews, Checklists)", "Descriptive Assessment (ABC data, Scatterplot)", "Functional Analysis (FA)", "Preference Assessment"], correctAnswer: 2 },

        // Skill Acquisition
        { question: "Breaking down a complex skill into smaller, teachable steps is known as:", options: ["Shaping", "Chaining", "Task Analysis", "Prompting"], correctAnswer: 2 },
        { question: "Providing a prompt and then gradually reducing its intensity or intrusiveness is called:", options: ["Prompt Fading", "Shaping", "Errorless Learning", "Differential Reinforcement"], correctAnswer: 0 },
        { question: "Discrete Trial Training (DTT) involves:", options: ["Teaching in the natural environment", "A structured teaching method with distinct trials", "Client-led learning opportunities", "Focusing only on behavior reduction"], correctAnswer: 1 },
        { question: "A discriminative stimulus (SD) is a stimulus that:", options: ["Signals the availability of reinforcement for a specific response", "Signals that punishment will occur", "Is always a verbal instruction", "Is presented after the behavior occurs"], correctAnswer: 0 },
        { question: "Reinforcing successive approximations of a target behavior is known as:", options: ["Chaining", "Shaping", "Fading", "Modeling"], correctAnswer: 1 },
        { question: "In a token economy, tokens function as:", options: ["Primary reinforcers", "Conditioned reinforcers", "Unconditioned punishers", "Negative reinforcers"], correctAnswer: 1 },
        { question: "When teaching a new skill, it is often best to use which schedule of reinforcement initially?", options: ["Continuous Reinforcement (CRF)", "Fixed Ratio (FR)", "Variable Interval (VI)", "Fixed Interval (FI)"], correctAnswer: 0 },
        { question: "Generalization occurs when:", options: ["A behavior occurs only in the presence of the specific SD used in training", "A behavior occurs across different settings, people, and stimuli", "A behavior is no longer reinforced", "A behavior is punished"], correctAnswer: 1 },
        { question: "Which of the following is the LEAST intrusive prompt?", options: ["Full Physical Prompt", "Verbal Prompt", "Gestural Prompt", "Visual Prompt (e.g. a picture)"], correctAnswer: 3 }, // Gestural can be less than verbal in some contexts, but visual often is least.
        { question: "The process of teaching a client to perform a sequence of behaviors in a specific order is called:", options: ["Shaping", "Task Analysis", "Chaining", "Pivotal Response Training"], correctAnswer: 2 },
        { question: "Errorless learning is a teaching procedure where:", options: ["The client is allowed to make many mistakes to learn from them.", "Prompts are used to ensure the client responds correctly, and then faded.", "Only incorrect responses are acknowledged.", "No reinforcement is provided."], correctAnswer: 1 },
        { question: "Incidental teaching (or Natural Environment Teaching - NET) involves:", options: ["Highly structured, repetitive trials.", "Teaching skills within naturally occurring activities and routines.", "Using only punishment procedures.", "Focusing solely on academic targets."], correctAnswer: 1 },
        { question: "Maintenance refers to:", options: ["The ability to perform a skill over time, after direct teaching has ended.", "The ability to perform a skill in different environments.", "The speed at which a client learns a new skill.", "The process of identifying new skills to teach."], correctAnswer: 0 },
        { question: "If an RBT is teaching a child to say 'cookie' when they want a cookie, the cookie itself is a(n):", options: ["Conditioned reinforcer", "Unconditioned reinforcer", "Discriminative stimulus", "Neutral stimulus"], correctAnswer: 1 },
        { question: "When a learner's behavior comes under the control of the relevant, natural antecedents and consequences, this is an example of:", options: ["Stimulus Control Transfer", "Overgeneralization", "Faulty Stimulus Control", "Response Blocking"], correctAnswer: 0 },

        // Behavior Reduction
        { question: "Differential Reinforcement of Alternative behavior (DRA) involves:", options: ["Reinforcing any behavior other than the target behavior", "Reinforcing a specific, appropriate behavior that serves the same function as the problem behavior", "Reinforcing the absence of the target behavior for a specific time period", "Reinforcing lower rates of the target behavior"], correctAnswer: 1 },
        { question: "Extinction occurs when:", options: ["A previously reinforced behavior is no longer followed by reinforcement", "A behavior is followed by an aversive stimulus", "An appropriate behavior is reinforced", "A behavior is prompted"], correctAnswer: 0 },
        { question: "An extinction burst is:", options: ["A sudden decrease in the target behavior when extinction is implemented", "A temporary increase in the frequency, intensity, or variability of the target behavior when extinction is implemented", "The point at which the behavior is completely eliminated", "A form of punishment"], correctAnswer: 1 },
        { question: "Which of the following is a critical component of a Behavior Intervention Plan (BIP)?", options: ["The client's diagnostic information", "Operational definitions of target behaviors and replacement behaviors", "A list of preferred medications", "The RBT's personal opinions about the client"], correctAnswer: 1 },
        { question: "A response cost procedure involves:", options: ["Adding an aversive stimulus after a behavior", "Removing a preferred stimulus/reinforcer after a behavior", "Ignoring a behavior", "Reinforcing an alternative behavior"], correctAnswer: 1 },
        { question: "Differential Reinforcement of Other behavior (DRO) involves delivering reinforcement when:", options: ["The target behavior has not occurred for a specific period of time", "An alternative behavior occurs", "The target behavior occurs at a lower rate", "The client requests reinforcement"], correctAnswer: 0 },
        { question: "Time-out from positive reinforcement is most effective when:", options: ["The 'time-in' environment is highly reinforcing", "The 'time-out' duration is very long", "It is used for all types of behavior", "It is the only intervention used"], correctAnswer: 0 },
        { question: "Spontaneous recovery refers to:", options: ["A client suddenly learning a new skill without teaching", "The reappearance of a behavior that was previously reduced or eliminated through extinction", "The rapid acquisition of skills during DTT", "A client recovering from an illness"], correctAnswer: 1 },
        { question: "When implementing an extinction procedure, it is important to:", options: ["Occasionally reinforce the behavior to see if it's still present", "Consistently withhold reinforcement for the target behavior", "Use punishment simultaneously", "Explain the procedure to the client in detail each time"], correctAnswer: 1 },
        { question: "If a behavior's function is escape from a task, a DRA procedure might involve:", options: ["Ignoring the behavior and continuing the task demand", "Allowing the client to escape the task when the problem behavior occurs", "Teaching the client to ask for a break and reinforcing this request", "Providing a reprimand when the problem behavior occurs"], correctAnswer: 2 },

        // Documentation and Reporting
        { question: "Objective session notes should primarily include:", options: ["The RBT's feelings about the session", "Observed behaviors and data collected", "Interpretations of why the client behaved a certain way", "Suggestions for changing the client's medication"], correctAnswer: 1 },
        { question: "If an RBT notices a new, severe problem behavior, they should:", options: ["Immediately implement a new intervention they think will work", "Wait until the next team meeting to mention it", "Document it and report it to their supervisor promptly", "Ask the parents to handle it"], correctAnswer: 2 },
        { question: "HIPAA regulations are primarily concerned with:", options: ["Ensuring quality of ABA services", "Protecting client confidentiality and privacy of health information", "Standardizing data collection methods", "Billing and insurance procedures"], correctAnswer: 1 },
        { question: "Which of the following is the BEST example of an objective statement in a session note?", options: ["'Client was very angry today.'", "'Client threw toys three times when asked to clean up.'", "'Client seemed sad because he missed his mom.'", "'Client had a good day and was mostly compliant.'"], correctAnswer: 1 },
        { question: "An RBT is required to maintain records of their supervision hours. These records should be:", options: ["Kept only by the supervisor", "Accurate, complete, and available for BACB audit", "Discarded after one year", "Shared with the client's parents"], correctAnswer: 1 },
        { question: "If an RBT makes an error in data collection, they should:", options: ["Ignore it to avoid confusion", "Change the data to what they think it should be", "Document the error and inform their supervisor", "Ask the client what the correct data point was"], correctAnswer: 2 },
        { question: "The RBT's primary communication regarding case programming and changes should be with:", options: ["The client's parents directly", "Other RBTs on the team", "Their direct supervisor (BCBA/BCaBA)", "The client's school teacher"], correctAnswer: 2 },
        { question: "When discussing client progress with stakeholders (e.g., parents), it is important to:", options: ["Use highly technical ABA jargon to sound professional", "Share your personal opinions about the client's family dynamics", "Communicate in clear, understandable language and focus on data/observations", "Promise specific outcomes and timelines for behavior change"], correctAnswer: 2 },
        { question: "A graphed data point that is far outside the range of other data points is called a(n):", options: ["Trend", "Level shift", "Outlier", "Phase change line"], correctAnswer: 2 },
        { question: "RBTs must report suspected abuse or neglect according to:", options: ["Their company's internal policy only", "Their personal judgment", "Mandated reporting laws and organizational policies", "The client's preference"], correctAnswer: 2 },

        // Professional Conduct and Scope of Practice
        { question: "The RBT Ethics Code emphasizes:", options: ["Prioritizing financial gain for the agency", "Maintaining client dignity and providing effective, evidence-based services", "Following instructions only from the client", "Designing complex behavior plans independently"], correctAnswer: 1 },
        { question: "An RBT is asked by a parent to provide advice on a sibling's behavior, who is not a current client. The RBT should:", options: ["Provide the advice, as they have general ABA knowledge", "Politely decline and refer the parent to their supervisor or suggest seeking services for the sibling", "Offer to start working with the sibling immediately", "Ignore the request"], correctAnswer: 1 },
        { question: "Dual relationships that could impair objectivity or lead to exploitation are:", options: ["Encouraged for building rapport", "Acceptable if the client consents", "Strictly prohibited by the RBT Ethics Code", "Only problematic if they involve financial exchange"], correctAnswer: 2 },
        { question: "If an RBT is unsure how to implement a part of the behavior plan, they should:", options: ["Try their best guess and see what happens", "Ask another RBT who has more experience", "Seek clarification from their supervisor before implementing", "Discontinue that part of the plan"], correctAnswer: 2 },
        { question: "Maintaining professional boundaries includes:", options: ["Accepting expensive gifts from clients", "Sharing personal problems with clients or their families", "Avoiding social media friending with clients/families and maintaining a professional demeanor", "Discussing other clients with a current client's family"], correctAnswer: 2 },
        { question: "An RBT's scope of practice primarily involves:", options: ["Conducting functional assessments independently", "Designing skill acquisition and behavior reduction programs", "Direct implementation of ABA procedures as prescribed by a supervisor", "Diagnosing psychiatric conditions"], correctAnswer: 2 },
        { question: "If a client's family offers an RBT a small gift, the RBT should:", options: ["Always accept it to be polite", "Politely decline, explaining company policy and ethical guidelines", "Accept it but don't tell their supervisor", "Ask for a different gift instead"], correctAnswer: 1 }, // Note: Some company policies allow very small, token gifts. "Politely decline..." is safest for an exam.
        { question: "Feedback from a supervisor should be viewed by the RBT as:", options: ["Personal criticism", "An opportunity for professional growth and skill improvement", "Optional suggestions that can be ignored", "A sign of incompetence"], correctAnswer: 1 },
        { question: "If an RBT disagrees with a supervisor's approach, they should:", options: ["Refuse to implement the plan", "Implement the plan but complain to other staff", "Professionally discuss their concerns with the supervisor, seeking understanding and resolution", "Change the plan to what they think is better"], correctAnswer: 2 },
        { question: "Maintaining client dignity means:", options: ["Only working with clients who are always compliant", "Treating clients with respect, ensuring privacy, and promoting independence", "Avoiding difficult or challenging behaviors", "Speaking for the client in all situations"], correctAnswer: 1 },

        // Additional Mix (covering various concepts again)
        { question: "A stimulus that, when presented immediately following a behavior, increases the future frequency of that behavior is called a:", options: ["Punisher", "Reinforcer", "Prompt", "Discriminative Stimulus"], correctAnswer: 1 },
        { question: "Negative reinforcement involves:", options: ["Presenting an aversive stimulus to decrease behavior", "Removing an aversive stimulus to increase behavior", "Presenting a preferred stimulus to increase behavior", "Removing a preferred stimulus to decrease behavior"], correctAnswer: 1 },
        { question: "Which schedule of reinforcement produces a 'scallop' effect on a cumulative graph?", options: ["Fixed Ratio (FR)", "Variable Ratio (VR)", "Fixed Interval (FI)", "Variable Interval (VI)"], correctAnswer: 2 },
        { question: "Motivating Operations (MOs) alter the _________ of a reinforcer and the _________ of behavior that has produced that reinforcer in the past.", options: ["Effectiveness; current frequency", "Type; intensity", "Schedule; duration", "Function; form"], correctAnswer: 0 },
        { question: "An RBT is teaching a child to tie their shoes. She provides hand-over-hand assistance for the entire process, then only for the tricky parts, then just a verbal reminder. This is an example of:", options: ["Shaping", "Prompt fading", "Chaining", "Extinction"], correctAnswer: 1 },
        { question: "The 'Dead Man's Test' helps to determine if something is a behavior. According to this test:", options: ["If a dead man can do it, it's a behavior.", "If a dead man cannot do it, it's a behavior.", "All observable actions are behaviors.", "Only intentional actions are behaviors."], correctAnswer: 1 },
        { question: "Differential Reinforcement of Low Rates of Behavior (DRL) is used when:", options: ["The behavior needs to be eliminated completely.", "The behavior is acceptable at a lower rate.", "An alternative behavior needs to be taught.", "The behavior should only occur in specific situations."], correctAnswer: 1 },
        { question: "The three-term contingency consists of:", options: ["Prompt, Response, Consequence", "Motivation, Instruction, Reinforcement", "Antecedent, Behavior, Consequence (ABC)", "Stimulus, Organism, Response"], correctAnswer: 2 },
        { question: "Task interspersal involves:", options: ["Mixing easy/mastered tasks with more difficult/acquisition tasks.", "Only presenting difficult tasks.", "Allowing the client to choose all tasks.", "Breaking tasks into very small steps."], correctAnswer: 0 },
        { question: "Antecedent interventions are strategies designed to:", options: ["Be implemented after a behavior occurs.", "Prevent problem behavior from occurring.", "Only increase desired behaviors.", "Replace consequence-based strategies."], correctAnswer: 1 },
        { question: "Which is an example of stimulus generalization?", options: ["A child learns to say 'dog' to a picture of a poodle and then says 'dog' to a real German Shepherd.", "A child says 'dog' only to the specific picture used in training.", "A child learns to say 'dog' and then also learns to say 'cat'.", "A child stops saying 'dog' when reinforcement is withdrawn."], correctAnswer: 0 },
        { question: "Response generalization is when:", options: ["A single stimulus evokes multiple, similar responses.", "Multiple stimuli evoke the same response.", "A behavior occurs in different settings.", "A behavior is maintained over time."], correctAnswer: 0 },
        { question: "A behavior is considered 'functional' if it:", options: ["Looks appropriate to others.", "Serves a purpose or produces a desired outcome for the individual.", "Is easy for the RBT to manage.", "Occurs at a high rate."], correctAnswer: 1 },
        { question: "A crisis/emergency procedure in a BIP should outline:", options: ["How to immediately ensure safety and who to contact.", "Long-term skill acquisition goals.", "Preferred leisure activities for the client.", "The RBT's work schedule."], correctAnswer: 0 },
        { question: "Token economies are based on the principle of:", options: ["Negative reinforcement", "Punishment", "Conditioned reinforcement", "Extinction"], correctAnswer: 2 },
        { question: "When collecting ABC data, the 'A' stands for:", options: ["Action", "Antecedent", "Assessment", "Approval"], correctAnswer: 1 },
        { question: "A Fixed Ratio 5 (FR5) schedule of reinforcement means:", options: ["Reinforcement is delivered for the first response after 5 minutes.", "Reinforcement is delivered after every 5th correct response.", "Reinforcement is delivered on average every 5 minutes.", "Reinforcement is delivered on average after every 5th correct response."], correctAnswer: 1 },
        { question: "A Variable Interval 3-minute (VI3) schedule means reinforcement is available for the first correct response:", options: ["Exactly every 3 minutes.", "After an average of 3 minutes has passed.", "After 3 correct responses.", "After an average of 3 correct responses."], correctAnswer: 1 },
        { question: "What is the primary purpose of frequent data collection in ABA?", options: ["To meet billing requirements.", "To allow for ongoing monitoring of behavior and informed decision-making about interventions.", "To keep the RBT busy during sessions.", "To create complex graphs for presentations."], correctAnswer: 1 },
        { question: "If a behavior plan is not working, the RBT should:", options: ["Modify the plan independently based on their observations.", "Continue implementing it strictly as written and hope it improves.", "Immediately stop the plan and try something new from a textbook.", "Collect data on its effectiveness and consult with their supervisor."], correctAnswer: 3 },
        { question: "Stimulus fading involves:", options: ["Gradually removing prompts.", "Gradually changing the form or intensity of a stimulus that controls a response.", "Increasing the number of stimuli presented.", "Fading out reinforcement."], correctAnswer: 1 },
        { question: "Which of the following describes 'modeling' as a teaching procedure?", options: ["Providing physical guidance.", "Verbally describing the steps.", "Demonstrating the desired behavior for the learner to imitate.", "Reinforcing successive approximations."], correctAnswer: 2 },
        { question: "The term 'pairing' in ABA often refers to:", options: ["Matching stimuli in a preference assessment.", "Associating oneself or a neutral stimulus with preferred items/activities to become a conditioned reinforcer.", "Working in pairs with another RBT.", "Pairing a punishment with a verbal reprimand."], correctAnswer: 1 },
        { question: "If an RBT is working with a client who engages in self-injurious behavior (SIB), the RBT's immediate priority is:", options: ["To understand the function of the SIB.", "To teach a replacement behavior.", "To ensure the client's safety and implement crisis procedures if necessary.", "To collect frequency data on the SIB."], correctAnswer: 2 },
        { question: "The 'reversal' phase in an A-B-A-B design helps to demonstrate:", options: ["Generalization of the behavior.", "Functional control of the independent variable over the dependent variable.", "Maintenance of the behavior change.", "The effectiveness of punishment."], correctAnswer: 1 },
        { question: "When teaching new skills, using a variety of examples and teaching in different settings can promote:", options: ["Extinction", "Generalization", "Punishment effects", "Prompt dependency"], correctAnswer: 1 },
        { question: "An operational definition of a behavior should be:", options: ["Broad and subjective.", "Observable, measurable, and clear.", "Focused on the presumed internal state of the individual.", "Written by the client's parents."], correctAnswer: 1 },
        { question: "Which measurement system would be most appropriate for recording the number of times a student raises their hand in class?", options: ["Duration", "Latency", "Frequency/Event Recording", "Partial Interval"], correctAnswer: 2 },
        { question: "A mand is a type of verbal operant that is:", options: ["A label or tact, controlled by a nonverbal stimulus.", "A request, controlled by a motivating operation (MO).", "An imitative response.", "A conversational response, controlled by a verbal stimulus."], correctAnswer: 1 },
        { question: "An RBT can assist a BCBA in training stakeholders by:", options: ["Developing the training curriculum.", "Modeling implementation of procedures and providing feedback as directed by the supervisor.", "Evaluating the overall effectiveness of the training program.", "Independently deciding who needs training."], correctAnswer: 1 },
        { question: "Which statement best describes the RBT's responsibility regarding client privacy?", options: ["Share client information freely with other professionals involved in their care.", "Only discuss client information in designated private settings and with authorized individuals.", "Post general updates about client progress on social media without using names.", "Allow anyone who asks to view client records."], correctAnswer: 1 },
        { question: "An RBT is working with a child who often tantrums to get a toy. The BCBA has written a plan to give the child the toy when they ask for it nicely ('I want toy, please') instead of when they tantrum. This is an example of:", options: ["DRO", "Extinction", "DRA", "Punishment"], correctAnswer: 2 },
        { question: "The BACB requires RBTs to receive ongoing supervision for at least ___% of the hours they provide behavior-analytic services per month.", options: ["1%", "2%", "5%", "10%"], correctAnswer: 2 },
        { question: "If a child can identify a picture of a cat, but cannot say 'cat' when they see a real cat, this demonstrates an issue with:", options: ["Maintenance", "Response generalization", "Stimulus generalization", "Motivation"], correctAnswer: 2 },
        { question: "Backward chaining involves:", options: ["Teaching the first step of a task analysis first.", "Teaching all steps of a task analysis simultaneously.", "Teaching the last step of a task analysis first, with the trainer completing all preceding steps.", "Teaching the steps in a random order."], correctAnswer: 2 },
        { question: "A scatterplot data sheet is most useful for identifying:", options: ["The frequency of a behavior.", "The duration of a behavior.", "Patterns of behavior related to time of day or activities.", "The function of a behavior directly."], correctAnswer: 2 },
        { question: "Before starting a session, an RBT should:", options: ["Immediately start DTT drills.", "Review the behavior plan and prepare necessary materials.", "Wait for the client to initiate activities.", "Ask the parents what they want to work on today."], correctAnswer: 1 },
        { question: "A primary reinforcer is a stimulus that:", options: ["Is learned through association with other reinforcers.", "Is naturally reinforcing, like food or water.", "Is only effective for a short period.", "Is used in a token economy."], correctAnswer: 1 },
        { question: "Continuous data collection involves recording:", options: ["Every instance of the target behavior during an observation period.", "Whether the behavior occurred at specific moments in time.", "Whether the behavior occurred at any point during an interval.", "The product or outcome of a behavior."], correctAnswer: 0 },
        { question: "The goal of Behavior Skills Training (BST) is to:", options: ["Reduce problem behavior.", "Teach new skills effectively through instruction, modeling, rehearsal, and feedback.", "Assess client preferences.", "Conduct functional analyses."], correctAnswer: 1 }
    ];

    // --- Quiz State ---
    let currentQuestionIndex = 0;
    let userAnswers = [];
    let timerInterval;
    let timeLeft = TOTAL_EXAM_TIME_MINUTES * 60;
    let shuffledQuestions = [];

    // --- Functions ---

    function shuffleArray(array) {
        // Fisher-Yates shuffle algorithm
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function startTimer() {
        timeEl.textContent = formatTime(timeLeft);
        timerInterval = setInterval(() => {
            timeLeft--;
            timeEl.textContent = formatTime(timeLeft);
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                finishExam(true); // Auto-finish if time runs out
            }
        }, 1000);
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    function updateProgressBar() {
        const progress = ((currentQuestionIndex +1) / shuffledQuestions.length) * 100;
        progressBar.style.width = `${progress}%`;
    }

    function loadQuestion() {
        if (currentQuestionIndex < 0 || currentQuestionIndex >= shuffledQuestions.length) {
            console.error("Invalid question index");
            return;
        }

        const currentQ = shuffledQuestions[currentQuestionIndex];
        questionTextEl.textContent = currentQ.question;
        questionNumberEl.textContent = `Question ${currentQuestionIndex + 1} of ${shuffledQuestions.length}`;
        optionsListEl.innerHTML = ''; // Clear previous options

        // Shuffle options for this question
        const optionsWithOriginalIndices = currentQ.options.map((option, index) => ({ text: option, originalIndex: index }));
        const shuffledOptions = shuffleArray([...optionsWithOriginalIndices]); // Create a new shuffled array

        shuffledOptions.forEach(optionObj => {
            const li = document.createElement('li');
            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = 'option';
            radio.value = optionObj.originalIndex; // Store original index as value
            radio.id = `option${optionObj.originalIndex}`;

            const label = document.createElement('label');
            label.htmlFor = `option${optionObj.originalIndex}`;
            label.textContent = optionObj.text;

            li.appendChild(radio);
            li.appendChild(label);
            li.addEventListener('click', () => { // Allow clicking the whole li to select
                radio.checked = true;
                handleOptionSelect(radio);
            });

            radio.addEventListener('change', () => handleOptionSelect(radio));

            // If an answer was previously selected for this question, check the radio button
            if (userAnswers[currentQuestionIndex] !== undefined && parseInt(radio.value) === userAnswers[currentQuestionIndex]) {
                radio.checked = true;
                li.classList.add('selected');
            }
            optionsListEl.appendChild(li);
        });
        updateProgressBar();
        updateNavigationButtons();
    }


    function handleOptionSelect(radioElement) {
        userAnswers[currentQuestionIndex] = parseInt(radioElement.value);
        // Visual feedback for selected option
        document.querySelectorAll('#options-list li').forEach(li => li.classList.remove('selected'));
        if(radioElement.checked) {
            radioElement.parentElement.classList.add('selected');
        }
    }

    function updateNavigationButtons() {
        prevBtn.disabled = currentQuestionIndex === 0;
        nextBtn.disabled = currentQuestionIndex === shuffledQuestions.length - 1;
        finishBtn.style.display = 'inline-block'; // Always show finish button or specific logic
    }

    function showNextQuestion() {
        if (currentQuestionIndex < shuffledQuestions.length - 1) {
            currentQuestionIndex++;
            loadQuestion();
        }
    }

    function showPrevQuestion() {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            loadQuestion();
        }
    }

    function finishExam(timedOut = false) {
        clearInterval(timerInterval);
        quizArea.style.display = 'none';
        document.getElementById('navigation-controls').style.display = 'none';
        document.getElementById('timer-container').style.display = 'none';
        document.getElementById('progress-bar-container').style.display = 'none';
        resultsArea.style.display = 'block';

        let score = 0;
        for (let i = 0; i < shuffledQuestions.length; i++) {
            if (userAnswers[i] === shuffledQuestions[i].correctAnswer) {
                score++;
            }
        }

        const percentage = (score / shuffledQuestions.length) * 100;
        scorePercentageEl.textContent = percentage.toFixed(2);
        scoreActualEl.textContent = score;
        totalQuestionsEl.textContent = shuffledQuestions.length;

        if (percentage >= PASSING_PERCENTAGE) {
            passFailMessageEl.textContent = "Congratulations! You Passed!";
            passFailMessageEl.className = 'pass';
        } else {
            passFailMessageEl.textContent = "You did not pass. Keep studying!";
            passFailMessageEl.className = 'fail';
        }
        if (timedOut) {
            resultSummaryEl.textContent = "The exam was automatically submitted because time ran out.";
        } else {
            resultSummaryEl.textContent = "You have completed the exam.";
        }
    }

    function displayReview() {
        resultsArea.style.display = 'none';
        reviewArea.style.display = 'block';
        reviewContentEl.innerHTML = ''; // Clear previous review

        shuffledQuestions.forEach((q, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('review-item');

            const qNum = document.createElement('h4');
            qNum.textContent = `Question ${index + 1}:`;
            itemDiv.appendChild(qNum);

            const qText = document.createElement('p');
            qText.textContent = q.question;
            itemDiv.appendChild(qText);

            const ul = document.createElement('ul');
            ul.style.listStyleType = 'none';
            ul.style.paddingLeft = '0';

            q.options.forEach((opt, optIndex) => {
                const li = document.createElement('li');
                li.textContent = `${String.fromCharCode(65 + optIndex)}. ${opt}`; // A. Option text

                if (optIndex === q.correctAnswer) {
                    li.classList.add('correct-answer');
                    if (userAnswers[index] === optIndex) {
                       li.innerHTML += ' <span style="color:green; font-weight:normal;">(Your Answer - Correct)</span>';
                    } else {
                       li.innerHTML += ' <span style="color:green; font-weight:normal;">(Correct Answer)</span>';
                    }
                }
                if (userAnswers[index] === optIndex && optIndex !== q.correctAnswer) {
                    li.classList.add('incorrect-answer');
                    li.innerHTML += ' <span style="color:red; font-weight:normal;">(Your Answer - Incorrect)</span>';
                }
                 ul.appendChild(li);
            });
            itemDiv.appendChild(ul);

            if(userAnswers[index] === undefined) {
                const noAns = document.createElement('p');
                noAns.style.color = 'orange';
                noAns.textContent = 'You did not answer this question.';
                itemDiv.appendChild(noAns);
            }
            reviewContentEl.appendChild(itemDiv);
        });
    }


    function restartExam() {
        currentQuestionIndex = 0;
        userAnswers = [];
        timeLeft = TOTAL_EXAM_TIME_MINUTES * 60;
        clearInterval(timerInterval); // Clear any existing timer

        // Re-shuffle questions for a new attempt
        shuffledQuestions = shuffleArray([...questionBank]);
        userAnswers = new Array(shuffledQuestions.length).fill(null);


        quizArea.style.display = 'block';
        resultsArea.style.display = 'none';
        reviewArea.style.display = 'none';
        document.getElementById('navigation-controls').style.display = 'flex';
        document.getElementById('timer-container').style.display = 'block';
        document.getElementById('progress-bar-container').style.display = 'block';
        progressBar.style.width = '0%';


        loadQuestion();
        startTimer();
    }

    // --- Event Listeners ---
    nextBtn.addEventListener('click', showNextQuestion);
    prevBtn.addEventListener('click', showPrevQuestion);
    finishBtn.addEventListener('click', () => {
        // Optional: Add a confirmation dialog
        if (confirm("Are you sure you want to finish the exam?")) {
            finishExam();
        }
    });
    restartBtn.addEventListener('click', restartExam);
    reviewAnswersBtn.addEventListener('click', displayReview);
    backToResultsBtn.addEventListener('click', () => {
        reviewArea.style.display = 'none';
        resultsArea.style.display = 'block';
    });


    // --- Initialize Quiz ---
    function initQuiz() {
        if (questionBank.length === 0) {
            questionTextEl.textContent = "Error: No questions loaded.";
            return;
        }
        shuffledQuestions = shuffleArray([...questionBank]); // Shuffle initial set
        userAnswers = new Array(shuffledQuestions.length).fill(null); // Initialize userAnswers array

        loadQuestion();
        startTimer();
    }

    initQuiz();
});
