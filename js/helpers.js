function sprints(start, end) {
    var sprints = [];

    for (var i = start; i <= end; i += 1) {
        sprints.push('Sprint ' + (i + 1));
    }

    return sprints;
}

function insertTimeframe() {
    $('#timeframe').html('<p>Sprint ' + SPRINT.current + '</p><p>from ' + SPRINT.start.toDateString() + ' to ' + SPRINT.end.toDateString());
}

function createJiraMetrics() {
    var chart = $('#jira-metrics').highcharts({
        chart: {
            type: 'column'
        },
        title: undefined,
        xAxis: {
            categories: sprints(SPRINT.current - JIRA.completed.length, SPRINT.current)
        },
        yAxis: {
            title: {
                text: 'Story points'
            }
        },
        series: [{
            name: 'Committed',
            color: 'rgba(108, 116, 114, 0.5)',
            borderColor: 'rgba(108, 116, 114, 0.8)',
            data: JIRA.committed
        }, {
            name: 'Completed',
            color: 'rgba(252, 195, 30, 0.5)',
            borderColor: 'rgba(252, 195, 30, 1)',
            data: JIRA.completed
        }]
    });
}

function createSonarMetrics() {
    var chart = $('#sonar-metrics').highcharts({
        chart: {
            type: 'line'
        },
        title: undefined,
        xAxis: {
            categories: sprints(SPRINT.current - SONAR.coverage.length, SPRINT.current)
        },
        yAxis: [{
            title: {
                text: 'Complexity'
            },
            opposite: true
        }, {
            labels: {
                format: '{value} \%'
            },
            title: {
                text: 'Coverage'
            }
            // opposite: true
        }],
        series: [{
            name: 'Complexity',
            color: 'rgba(31, 119, 180, 0.8)',
            yAxis: 0,
            data: SONAR.complexity
        }, {
            name: 'Coverage',
            color: 'rgba(255, 127, 14, 0.8)',
            yAxis: 1,
            data: SONAR.coverage
        }]
    });
}

function createGitMetrics() {
    var chart = $('#git-metrics').highcharts({
        chart: {
            type: 'area'
        },
        title: undefined,
        xAxis: {
            categories: sprints(SPRINT.current - SONAR.coverage.length, SPRINT.current)
        },
        yAxis: {
            title: {
                text: 'Deletions / Additions'
            }
        },
        series: [{
            name: 'Additions',
            color: '#6cc644',
            data: GIT.additions
        }, {
            name: 'Deletions',
            color: '#bd2c00',
            data: _.map(GIT.deletions, function (deletions) {
                return deletions * -1;
            })
        }]
    });
}
