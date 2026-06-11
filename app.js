/**
 * Email Template Generator Logic Engine
 * Created for Academic Project Demonstration 
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // Core DOM Element Hooks
    const compileBtn = document.getElementById('compileBtn');
    const copyToClipboard = document.getElementById('copyToClipboard');
    const promptInput = document.getElementById('promptInput');
    const toneSelect = document.getElementById('toneSelect');
    const lengthSelect = document.getElementById('lengthSelect');
    const senderField = document.getElementById('senderField');
    const recipientField = document.getElementById('recipientField');

    const loader = document.getElementById('loader');
    const fallbackDisplay = document.getElementById('fallbackDisplay');
    const outputDisplay = document.getElementById('outputDisplay');
    const subjectView = document.getElementById('subjectView');
    const bodyView = document.getElementById('bodyView');

    // Rule-Based Mapping Structure for Synthesis Matrix
    const frameworkMatrix = {
        formal: {
            subjectPrefix: "Formal Notice: ",
            greetings: "Dear",
            openers: [
                "I hope this communication finds you well. I am writing to formally request your attention regarding",
                "With reference to our recent schedules, I wish to initiate a formal follow-up regarding"
            ],
            closers: "Please let me know your convenient slots or alternative procedures to streamline this deployment. Thank you for your consideration.",
            signoff: "Sincerely,\n"
        },
        casual: {
            subjectPrefix: "Quick update: ",
            greetings: "Hey",
            openers: [
                "Hope you are doing great! Just wanted to quickly check in with you regarding",
                "Dropping a quick message to see what your thoughts are regarding"
            ],
            closers: "Let me know what works best for you whenever you get a free track of time. Talk soon!",
            signoff: "Cheers,\n"
        },
        marketing: {
            subjectPrefix: "Exclusive Opportunity: ",
            greetings: "Hello",
            openers: [
                "I hope you are driving great results this week. I am reaching out because we have discovered a unique solution regarding",
                "Are you looking to optimize performance parameters? Let's take a quick look at our strategy regarding"
            ],
            closers: "We can schedule a brief 10-minute discovery call next week to benchmark these milestones. Looking forward to connecting.",
            signoff: "Best regards,\n"
        },
        urgent: {
            subjectPrefix: "URGENT ACTION: ",
            greetings: "Attention",
            openers: [
                "Please review this brief immediately. We have a high-priority dependency concerning",
                "This requires your critical review on priority. We are facing immediate deadlines regarding"
            ],
            closers: "Kindly confirm receipt of this update and provide your structural inputs before the end of the current sprint.",
            signoff: "Regards,\n"
        }
    };

    // Main Engine Generation Routine Trigger
    compileBtn.addEventListener('click', () => {
        const inputData = promptInput.value.trim();
        const selectedTone = toneSelect.value;
        const selectedLength = lengthSelect.value;
        
        // Fallback default assignments if optional input blocks are left vacant
        const sender = senderField.value.trim() || "[Your Name]";
        const recipient = recipientField.value.trim() || "[Recipient Name]";

        // Simple Validation Rule Check
        if (!inputData) {
            alert("Error: Please populate the Context area with primary topics or keywords first.");
            promptInput.focus();
            return;
        }

        // Show Processing Loader state
        loader.classList.remove('hidden');

        // Emulate typical system evaluation pipeline response timeout
        setTimeout(() => {
            const toneData = frameworkMatrix[selectedTone];
            
            // Build Dynamic Subject Line Text Output
            const shortTopic = inputData.length > 40 ? inputData.substring(0, 40) + "..." : inputData;
            const finalSubject = `${toneData.subjectPrefix}${shortTopic}`;

            // Select index assignment pseudo-randomly to mimic natural variation patterns
            const selectionIndex = inputData.length % toneData.openers.length;
            const coreOpener = toneData.openers[selectionIndex];

            // Build Body Architecture Parts
            let salutationBlock = `${toneData.greetings} ${recipient},`;
            let openingBlock = `${coreOpener} ${inputData}.`;
            let closingBlock = toneData.closers;
            let signatureBlock = `${toneData.signoff}${sender}`;

            // Handle Conditional Length Additions/Pruning to look organically compiled
            let coreContextParagraph = "";
            if (selectedLength === 'medium' || selectedLength === 'long') {
                coreContextParagraph = "To establish standard clarity, tracking these milestones closely ensures all dependencies align smoothly. We want to clear out blockers early before any critical path timelines are impacted.";
            }

            let extendedAnalysisList = "";
            if (selectedLength === 'long') {
                extendedAnalysisList = "Here are our key action checkpoints for immediate review:\n- Phase 1: Context assessment and feedback aggregation.\n- Phase 2: Implementation of core structural edits.\n- Phase 3: Final confirmation validation tracking.";
            }

            // Synthesize all parts into single structured layout output block
            let absoluteBody = `${salutationBlock}\n\n${openingBlock}\n\n`;
            if(coreContextParagraph) absoluteBody += `${coreContextParagraph}\n\n`;
            if(extendedAnalysisList) absoluteBody += `${extendedAnalysisList}\n\n`;
            absoluteBody += `${closingBlock}\n\n${signatureBlock}`;

            // Update UI Viewport Elements with processed text data
            subjectView.textContent = finalSubject;
            bodyView.textContent = absoluteBody;

            // UI view toggles manipulation
            loader.classList.add('hidden');
            fallbackDisplay.classList.add('hidden');
            outputDisplay.classList.remove('hidden');
            copyToClipboard.removeAttribute('disabled');

        }, 700);
    });

    // Clipboard Copy Flow Logic Integration
    copyToClipboard.addEventListener('click', () => {
        const completeCompiledData = `Subject: ${subjectView.textContent}\n\n${bodyView.textContent}`;
        
        navigator.clipboard.writeText(completeCompiledData).then(() => {
            const originalText = copyToClipboard.innerHTML;
            copyToClipboard.innerHTML = `<i class="fa-solid fa-check text-green-400"></i> Copied`;
            
            setTimeout(() => {
                copyToClipboard.innerHTML = originalText;
            }, 1800);
        }).catch(err => {
            console.error('System failure writing data blocks to user clipboard: ', err);
        });
    });
});