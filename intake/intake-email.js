/* Build a complete local summary and an email draft without submitting data. */
(function (root) {
  'use strict';
  const fields = [
    ['contact_name', 'Contact name'], ['contact_role', 'Role / title'], ['contact_email', 'Email'],
    ['contact_phone', 'Phone'], ['org_name', 'Organization'], ['org_website', 'Website'],
    ['org_type', 'Organization type'], ['org_years', 'Years operating'], ['org_staff', 'Paid staff'],
    ['org_volunteers', 'Volunteers'], ['org_state', 'State / region'], ['org_rural', 'Rural area'],
    ['org_mission', 'What you do'], ['tools', 'Tools used', 'tools_other'],
    ['comms', 'Internal communication', 'comms_other'], ['time_drains', 'Top time drains'],
    ['repetitive_tasks', 'Repetitive tasks'], ['ai_experience', 'AI experience'],
    ['ai_tools_used', 'AI tools used'], ['what_brought_you', 'What brought you here'],
    ['ai_dream_fix', 'Problem to solve'], ['success_looks_like', 'What success looks like'],
    ['ai_concerns', 'AI concerns'], ['ai_exclusions', 'AI boundaries'],
    ['services_interest', 'Services of interest'], ['budget_range', 'Budget range'],
    ['ideal_timeline', 'Timeline'], ['work_format', 'Work format'],
    ['referral_source', 'How you found Mission First', 'referral_other'], ['referral_name', 'Referral name'],
    ['anything_else', 'Anything else']
  ];
  function buildSummary(data) {
    const lines = ['Mission First intake questionnaire'];
    fields.forEach(([name, label, otherName]) => {
      const selected = data.getAll(name).filter(v => typeof v === 'string').map(v => v.trim()).filter(Boolean);
      let value = selected.join(', ');
      const other = otherName && selected.includes('Other') ? String(data.get(otherName) || '').trim() : '';
      if (other) value = selected.filter(v => v !== 'Other').concat('Other: ' + other).join(', ');
      if (value) lines.push(label + ':\n' + value);
    });
    return lines.join('\n\n');
  }
  function buildDraft(summary) {
    const prefix = 'mailto:hello@missionfirst.ai?subject=' + encodeURIComponent('Mission First intake questionnaire') + '&body=';
    const full = prefix + encodeURIComponent(summary);
    if (full.length <= 1800) return { href: full, needsAttachment: false };
    return {
      href: prefix + encodeURIComponent('Hello Michelle,\n\nI have completed your intake questionnaire.\n\n[Before sending, paste my copied answers here or attach mission-first-intake.txt.]'),
      needsAttachment: true
    };
  }
  const api = { buildSummary, buildDraft };
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.IntakeEmail = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
