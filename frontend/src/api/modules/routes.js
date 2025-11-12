/**
 * @description 存放所有通信API接口路径
 * @description 根据 api.yaml v1.1.0 整理
 */
export default {
  // --- Common ---
  GET_CAROUSEL: '/carousel',

  // --- Auth ---
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  GET_USER_PERMISSIONS: '/user/permissions',

  // --- User Profile ---
  GET_USER_PROFILE: '/user/profile',
  UPDATE_USER_PROFILE: '/user/profile',
  UPLOAD_AVATAR: '/user/profile/avatar',
  GET_USER_CLUBS: '/user/clubs',
  GET_USER_ACTIVITIES: '/user/activities',

  // --- Club ---
  GET_CLUBS: '/clubs',
  CREATE_CLUB: '/clubs',
  GET_CLUB_DETAIL: (clubId) => `/clubs/${clubId}`,
  UPDATE_CLUB: (clubId) => `/clubs/${clubId}`,
  DELETE_CLUB: (clubId) => `/clubs/${clubId}`,
  JOIN_CLUB: (clubId) => `/clubs/${clubId}/join`,
  GET_CLUB_MATCH_SCORE: (clubId) => `/clubs/${clubId}/match`,

  // --- Club Admin ---
  GET_CLUB_MEMBERS: (clubId) => `/clubs/${clubId}/members`,
  ADD_CLUB_MEMBERS: (clubId) => `/clubs/${clubId}/members`,
  DELETE_CLUB_MEMBERS: (clubId) => `/clubs/${clubId}/members/batch`,
  UPDATE_MEMBER_SEAT: (clubId, memberId) => `/clubs/${clubId}/members/${memberId}/seat`,
  GET_CLUB_ROLES: (clubId) => `/clubs/${clubId}/roles`,
  CREATE_CLUB_ROLE: (clubId) => `/clubs/${clubId}/roles`,
  UPDATE_CLUB_ROLE: (clubId, roleId) => `/clubs/${clubId}/roles/${roleId}`,
  DELETE_CLUB_ROLE: (clubId, roleId) => `/clubs/${clubId}/roles/${roleId}`,
  GET_CLUB_ANNOUNCEMENTS: (clubId) => `/clubs/${clubId}/announcements`,
  CREATE_CLUB_ANNOUNCEMENT: (clubId) => `/clubs/${clubId}/announcements`,
  UPDATE_CLUB_ANNOUNCEMENT: (clubId, announcementId) => `/clubs/${clubId}/announcements/${announcementId}`,
  DELETE_CLUB_ANNOUNCEMENT: (clubId, announcementId) => `/clubs/${clubId}/announcements/${announcementId}`,
  GET_CLUB_APPLICATIONS: '/clubs/applications',
  REVIEW_CLUB_APPLICATION: (appId) => `/clubs/applications/${appId}/review`,

  // --- Activity ---
  GET_ACTIVITIES: '/activities',
  CREATE_ACTIVITY: '/activities',
  GET_ACTIVITY_DETAIL: (activityId) => `/activities/${activityId}`,
  UPDATE_ACTIVITY: (activityId) => `/activities/${activityId}`,
  DELETE_ACTIVITY: (activityId) => `/activities/${activityId}`,
  ENROLL_ACTIVITY: (activityId) => `/activities/${activityId}/enroll`,
  SIGNIN_ACTIVITY: (activityId) => `/activities/${activityId}/signin`,
  SUBMIT_ACTIVITY_FEEDBACK: (activityId) => `/activities/${activityId}/feedback`,
  GET_ACTIVITY_FEEDBACK_RESULTS: (activityId) => `/activities/${activityId}/feedback/results`,
  SUBMIT_ACTIVITY_VOTE: (activityId) => `/activities/${activityId}/vote`,
  GET_ACTIVITY_VOTE_RESULTS: (activityId) => `/activities/${activityId}/vote/results`,

  // --- Message ---
  SEND_MESSAGE: '/messages',
  GET_INBOX_MESSAGES: '/messages/inbox',
  MARK_MESSAGE_AS_READ: (messageId) => `/messages/${messageId}/read`,
  GET_NOTIFICATIONS: '/messages/notifications',
  GET_MAILBOX_EMAILS: '/messages/mailbox/emails',

  // --- Finance ---
  GET_EXPENSES: '/finance/expenses',
  CREATE_EXPENSE: '/finance/expenses',
  APPROVE_EXPENSE: (expenseId) => `/finance/expenses/${expenseId}/approval`,

  // --- Analytics ---
  GET_CLUB_ACTIVITY_STATS: '/analytics/club/active',
  GET_ACTIVITY_PARTICIPATION_STATS: '/analytics/activity/participation',
  GET_MATERIAL_LEDGER: '/analytics/material/ledger',
  GET_MEMBER_ATTENDANCE: '/analytics/member/attendance',

  // --- System ---
  LLM_QUERY: '/system/llm/query',
  GET_LLM_LOGS: '/system/llm/logs',
  CREATE_WIKI_ENTRY_FROM_LOG: '/system/llm/wiki-entry',
  GET_SYSTEM_LOGS: '/system/logs',
  TRIGGER_DB_BACKUP: '/system/db/backup',
  TRIGGER_DB_RESTORE: '/system/db/restore',
}
