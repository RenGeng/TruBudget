import LocalizedStrings from 'react-localization';

const fr = {
  common: {
    cancel: 'Annuler',
    next: 'Suivant',
    submit: 'Soumettre',
    back: 'Retour',
    finish: 'Fin',
    comment_description: 'Description du commentaire',
    budget: 'Budget',
    comment: 'Commentaire',
    created: 'Créé',
    status: 'Statut',
    actions: 'Actions',
    assigned: 'Assigné',
    not_assigned: 'Non-assigné',
    not_assigned_budget: 'Budget non-désigné',
    assigned_budget: 'Budget assigné',
    disbursement: 'Budget déboursé',
    disbursed_budget: 'Budget décaissé',
    budget_distribution: 'Distribution budgétaire',
    task_status: 'Etat de la tâche',
    subprojects: 'Sous-projets',
    subproject: 'Sous-projet',
    history: 'Histoire',
    close: 'Fermer',
    open: 'ouvert',
    in_progress: 'En cours',
    in_review: 'En revue',
    done: 'Fait',
    assignees: 'Cessionnaire(s)',
    approver: 'Autorisé',
    bank: 'Banque',
    assignee: 'Cessionnaire'
  },

  login: {
    tru_budget_description: 'Une solution basée sur les blocs pour les dépenses budgétaires',
    environment: 'Environnement',
    test_env: 'Test',
    production_env: 'Prod',
    username: 'Nom d\'utilisateur',
    password: 'Mot de passe',
    incorrect_username: 'Nom d\'utilisateur incorrect',
    incorrect_password: 'Mot de passe incorrect',
    accenture_tag: 'Développé par Emerging Technologies and Innovation Accenture',
    login_button_title: 'Login',

  },
  project: {
    add_new_project: 'Ajouter un nouveau projet',
    project_name: 'Nom du projet',
    project_budget: 'Budget du projet',
    project_comment: 'Commentaire du projet',
    project_roles: 'Rôles de projet',
    project_title: 'Titre de projet',
    project_title_description: 'Description du titre du projet',
    project_budget_amount: 'Montant du budget du projet',
    project_budget_amount_description: 'Description du montant budget du projet',
    project_currency: 'Devise du projet',
    project_budget_authority_role: 'Sélectionnez le rôle d\'autorité budgétaire',
    project_budget_authority_role_description: 'L\'autorité a permis de modifier la ligne budgétaire du projet',
    project_implementing_authority_role: 'Sélectionnez le rôle d\'autorité de mise en œuvre',
    project_implementing_authority_role_description: 'Les autorités ont permis de créer et de modifier des sous-projets, de définir et d\'exécuter des activités de workflow',
    project_disbursement_authority_role: 'Sélectionnez le rôle d\'autorité de décaissement',
    project_disbursement_authority_role_description: 'Les autorités ont autorisé l\'approbation des transactions financières',
    project_authority_organization_search: 'Rechercher organisations',

  },
  subproject: {
    subproject_title: 'Sub-Project title',
    subproject_title_description: 'Name of the sub-project',
    subproject_budget_amount: 'Sub-project  budget amount',
    subproject_budget_amount_description: 'Budget for the sub-project',
    subproject_comment: 'Sub-project Comment',
    subproject_assigned_organization: 'Assigned Organization',
    subproject_add: 'Add new Sub-project',
    subproject_select_button: 'Select',
  },
  workflow: {
    workflow_title: 'Workflow title',
    workflow_title_description: 'Name of the workflow',
    workflow_budget_amount: ' Workflow budget amount',
    workflow_budget_amount_description: 'Budget amount for the workflow',
    workflow_comment: 'Workflow Comment',
    workflow_type_workflow: 'Workflow',
    workflow_type_transaction: 'Transaction',
    workflow_action_open_in_progress: 'Pending on ',
    workflow_action_in_review: 'Pending for review of',
    workflow_action_pending_approval: 'Pending for approval of ',
    workflow_budget_status_na: 'N/A',
    workflow_budget_status_allocated: 'Allocated',
    workflow_budget_status_disbursed: 'Disbursed',
    workflow_next_step: 'Next step',
    workflow_enable_sort: 'Sort',
    worfkfow_disable_sort: 'Save',
    workflow_table_title: 'Workflow items',
    workflow_type: 'Type',
    workflow_documents: 'Documents',
    workflow_name: 'Name',
    workflow_document_name: 'Document Name',
    workflow_document_description: 'Add name of document',
    workflow_no_documents: 'No documents',
    workflow_document_validate: 'Validate',
    workflow_document_validated: 'Validated',
    workflow_document_changed: 'Changed',
    workflow_upload_document: 'Upload',
    workflow_budget_na: 'Not applicable',
    workflow_budget_allocated: 'allocated',
    workflow_budget_disbursed: 'disbursed',
    workflow_budget: 'Workflow budget amount',
    workflow_budget_description: 'Budget amount for the workflow',
    workflow_submit_for_review: 'Submit for Review'
  },

  navigation: {
    unread_notifications: 'Unread Notifications',
    peers: 'Peers',
    connected_peers: 'Connected Peers',
    no_peers: 'No peers',
    logout: 'Logout',
    read_permission: 'Read',
    write_permission: 'Write',
    admin_permission: 'Admin',
    selections: 'Selections',
    options: 'Options',
    rtUpdates: 'Real-Time Updates',
    other_trustees: 'Other Trustees',
    menu_item_projects: 'Projects',
    menu_item_notifications: 'Notifications',
    menu_item_network: 'Network',
    main_site: 'Main',
    projects_site: 'Projects'
  },
  dashboard: {
    dashboard_title: 'The Blockchain network dashboard',
    dashboard_subtitle: 'Connected peers in the blockchain network',
    dashboard_card_text: ' The connected blockchain nodes are shown in the map below. You can click on the respective markers to obtain the exact location.'
  },
  notification: {
    notification_title: 'Notifications',
    notification_subtitle: 'Unread',
    notification_card_text: 'Please find your current notifications below. These display action items or information items to be dealt with.',
    notification_table_project: 'Project',
    notification_table_subproject: 'Subproject',
    notification_table_description: 'Description',
    notification_table_by: 'By',
    notification_table_role: 'Role',
    notification_table_all_read: 'all read',
    notification_table_view: 'View',
    create_workflow: 'Workflow {0} created ',
    edit_workflow: 'Workflow item {0} got adapted',
    create_transaction: 'Transaction {0} created ',
    edit_transaction: 'Transaction {0} got adapted',
    review_workflow: 'You are assigned to review the workflow item {0}',
    review_transaction: 'You are assigned to review the transaction {0}',
    done_workflow: 'Status of workflow {0} set to Done',
    done_transaction: 'Status of transaction {0} set to Done'
  },

  history: {
    edit_status: 'Status of workflow item {0} changed to {1}',
    edit_currency: 'Currency of workflow item {0} changed to {1} ',
    edit_amount: 'Amount of workflow item {0} changed from {1} to {2} ',
    edit_comment: 'Comment of workflow item {0} changed to {1} ',
    edit_addData: 'Additional data of workflow item {0} changed to {1} ',
    edit_workflowName: 'Name of workflow item {0} changed to {1} ',
    created_workflow: 'Workflow {0} created ',
    created_project: 'Project created ',
    created_subproject: 'Subproject {0} created',
    edit_amountType: 'Budget status of workflow item {0} changed from {1} to {2}',
    edit_documents: 'Documents changed for workflow item {0}',
    edit_subproject: 'Amount of {0} increased to {1}',
    first_sort: 'Moved {0} to first position',
    sort: 'Moved {0} after {1}'
  },
  language: {
    german: 'German',
    french: 'French',
    english: 'English',
  },
}
export default fr;
