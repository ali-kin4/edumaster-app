// Gemini API utility
export const callGemini = async (prompt, isJson = false) => {
    console.log("Calling Gemini with prompt:", prompt);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (prompt.includes("learning path")) {
        return `Here is a suggested learning path to become a data analyst:
1.  **Microsoft Excel:** Start here to build a strong foundation in data manipulation, formulas, and basic analysis. It's the bedrock of data work.
2.  **Database & SQL:** Next, learn how to retrieve and manage data from databases. SQL is a critical skill for any data analyst.
3.  **Python Programming:** Finally, dive into Python to learn how to automate tasks and perform more complex statistical analysis.`;
    }
    
    if (prompt.includes("study plan")) {
        return `Here is a personalized 3-day study plan to get you back on track:
* **Day 1: Focus on Digital Marketing.** Your progress is lowest here. Aim to complete the 'Introduction' and 'Core Concepts' lessons.
* **Day 2: Dive into UI/UX Design.** You're halfway through! Try to finish the 'Advanced Techniques' module.
* **Day 3: Review & Practice.** Revisit the Excel flashcards to keep your skills sharp and then spend some time on your Python project.`;
    }
    
    if (prompt.includes("assignment feedback")) {
        return `Here is some feedback on your project:
* **Clarity and Structure:** Ensure your final report is well-organized with clear headings. A good structure makes it easier to follow your analysis and conclusions.
* **Data Visualization:** When presenting data, choose the right chart for the job. Bar charts are great for comparisons, while line charts are better for trends over time.
* **Depth of Analysis:** Don't just present the data. Explain what it *means*. What insights can you draw? What recommendations can you make based on your findings?`;
    }
    
    if (isJson) {
        return JSON.stringify([
            { question: `What is the primary purpose of a PivotTable in Excel?`, options: ['Formatting data', 'Summarizing large datasets', 'Creating charts', 'Writing macros'], answer: 'Summarizing large datasets' },
            { question: `Which function is used to find the average of a range in Excel?`, options: ['=SUM()', '=MEAN()', '=AVERAGE()', '=COUNT()'], answer: '=AVERAGE()' },
        ]);
    }

    return `**Detailed Explanation:**

* **Core Idea:** The term you asked about, "A foundational concept for this topic," refers to the fundamental principles upon which all other knowledge in this subject is built. Think of it as the roots of a tree.
* **Why It Matters:** Without a solid grasp of these basics, tackling more advanced concepts becomes incredibly difficult. It's like trying to build a house without a proper foundation.
* **Example:** In programming, a foundational concept is a "variable." It's a simple idea of storing a piece of information, but it's essential for everything else you do.`;
};