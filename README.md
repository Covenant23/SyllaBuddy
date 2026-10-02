# SyllaBuddy

An AI-assisted student dashboard for organizing course requirements, tracking deadlines, and planning academic work.

Built for the Atlanta Innovation Cup. Currently in development.


## Non-AI baseline

The current page uses fixed extraction rules, not AI. Open `index.html` in a browser, paste syllabus text, and click **Find assignments**. Review and edit the results before relying on them.

- `index.html`: the updated baseline with fixes for misplaced due times and invalid calendar dates.
- `baseline/index_new.original.html`: the program manager's supplied version, preserved unchanged for comparison.
- `tests/`: automated regression and original-versus-corrected extraction checks.

With Node.js installed, run:

```sh
node tests/baseline.cjs
node tests/baseline-comparison.cjs
```

Automated checks passed using synthetic and real examples. The code owners also report testing the page with the MOT 6111 and Sociology 500 Fall 2026 syllabus; extraction accuracy and any manual corrections have not yet been recorded here. Testing does not guarantee support for every syllabus format.

The planned `baseline-v2` tag will identify the exact frozen version used for later AI comparisons. These notes do not imply that the tag has already been created. Preserve that version when adding AI extraction.
