$('.input-search').on('keyup', function () {
    var rex = new RegExp($(this).val(), 'i');
    $('.todo-box .todo-item').hide();
    $('.todo-box .todo-item').filter(function () {
        return rex.test($(this).text());
    }).show();
});
const taskViewScroll = new PerfectScrollbar('.task-text', {
    wheelSpeed: .5,
    swipeEasing: !0,
    minScrollbarLength: 40,
    maxScrollbarLength: 300,
    suppressScrollX: true
});
function CardCount(setCardCategoryCount) {
    var CardCategoryCount = setCardCategoryCount;
    // Get Parents Div(s)
    var get_ParentsDiv = $('.todo-item');
    var get_ALLCARDDIV = $('.todo-item.all-card');
    var get_CARDDIEDIV = $('.todo-item.card-die');
    var get_CARDLIVEDIV = $('.todo-item.card-live');
    var get_CARDUNKNOWDIV = $('.todo-item.card-unknow');
    // Get Parents Div(s) Counts
    var get_ALLCARDCOUNT = get_ALLCARDDIV.length;
    var get_CARDDIECOUNT = get_CARDDIEDIV.length;
    var get_CARDLIVECOUNT = get_CARDLIVEDIV.length;
    var get_CARDUNKNOWCOUNT = get_CARDUNKNOWDIV.length;
    // Get Badge Div(s)
    var getBadgeAllCard = $('#all-card .todo-badge');
    var getBadgeCardDie = $('#card-die .todo-badge');
    var getBadgeCardLive = $('#card-live .todo-badge');
    var getBadgeCardUnknow = $('#card-unknow .todo-badge');
    if (CardCategoryCount === 'allcard') {
        if (get_ALLCARDCOUNT === 0) {
            getBadgeAllCard.text('');
            return;
        }
        if (get_ALLCARDCOUNT > 9) {
            getBadgeAllCard.css({
                padding: '2px 0px',
                height: '25px',
                width: '25px'
            });
        } else if (get_ALLCARDCOUNT <= 9) {
            getBadgeAllCard.removeAttr('style');
        }
        getBadgeAllCard.text(get_ALLCARDCOUNT);
    } else if (CardCategoryCount === 'cardunknow') {
        if (get_CARDUNKNOWCOUNT === 0) {
            getBadgeCardUnknow.text('');
            return;
        }
        if (get_CARDUNKNOWCOUNT > 9) {
            getBadgeCardUnknow.css({
                padding: '2px 0px',
                height: '25px',
                width: '25px'
            });
        } else if (get_CARDUNKNOWCOUNT <= 9) {
            getBadgeCardUnknow.removeAttr('style');
        }
        getBadgeCardUnknow.text(get_CARDUNKNOWCOUNT);
    } else if (CardCategoryCount === 'carddie') {
        if (get_CARDDIECOUNT === 0) {
            getBadgeCardDie.text('');
            return;
        }
        if (get_CARDDIECOUNT > 9) {
            getBadgeCardDie.css({
                padding: '2px 0px',
                height: '25px',
                width: '25px'
            });
        } else if (get_CARDDIECOUNT <= 9) {
            getBadgeCardDie.removeAttr('style');
        }
        getBadgeCardDie.text(get_CARDDIECOUNT);
    } else if (CardCategoryCount === 'cardlive') {
        if (get_CARDLIVECOUNT === 0) {
            getBadgeCardLive.text('');
            return;
        }
        if (get_CARDLIVECOUNT > 9) {
            getBadgeCardLive.css({
                padding: '2px 0px',
                height: '25px',
                width: '25px'
            });
        } else if (get_CARDLIVECOUNT <= 9) {
            getBadgeCardLive.removeAttr('style');
        }
        getBadgeCardLive.text(get_CARDLIVECOUNT);
    }
}
new CardCount('allcard');
new CardCount('carddie');
new CardCount('cardlive');
new CardCount('cardunknow');
/*
  ====================
    Quill Editor
  ====================
*/
var quill = new Quill('#taskdescription', {
    modules: {
        toolbar: [
            [{
                header: [1, 2, false]
            }],
            ['bold', 'italic', 'underline'],
            ['image', 'code-block']
        ]
    },
    placeholder: 'Compose an epic...',
    theme: 'snow' // or 'bubble'
});
$('#addTaskModal').on('hidden.bs.modal', function (e) {
    // do something...
    $(this)
        .find("input,textarea,select")
        .val('')
        .end();
    quill.deleteText(0, 2000);
})
$('.mail-menu').on('click', function (event) {
    $('.tab-title').addClass('mail-menu-show');
    $('.mail-overlay').addClass('mail-overlay-show');
})
$('.mail-overlay').on('click', function (event) {
    $('.tab-title').removeClass('mail-menu-show');
    $('.mail-overlay').removeClass('mail-overlay-show');
})
$('#addTask').on('click', function (event) {
    event.preventDefault();
    $('.add-tsk').show();
    $('.edit-tsk').hide();
    $('#addTaskModal').modal('show');
    const ps = new PerfectScrollbar('.todo-box-scroll', {
        suppressScrollX: true
    });
});
const ps = new PerfectScrollbar('.todo-box-scroll', {
    suppressScrollX: true
});
const todoListScroll = new PerfectScrollbar('.todoList-sidebar-scroll', {
    suppressScrollX: true
});
function checkCheckbox() {
    $('.todo-item input[type="checkbox"]').click(function () {
        if ($(this).is(":checked")) {
            $(this).parents('.todo-item').addClass('card-die');
        } else if ($(this).is(":not(:checked)")) {
            $(this).parents('.todo-item').removeClass('card-die');
        }
        new CardCount('carddie');
    });
}
function deleteDropdown() {
    $('.action-dropdown .dropdown-menu .delete.dropdown-item').click(function () {
        if (!$(this).parents('.todo-item').hasClass('card-unknow')) {
            var getTodoParent = $(this).parents('.todo-item');
            var getTodoClass = getTodoParent.attr('class');
            var getFirstClass = getTodoClass.split(' ')[1];
            var getSecondClass = getTodoClass.split(' ')[2];
            var getThirdClass = getTodoClass.split(' ')[3];
            if (getFirstClass === 'all-card') {
                getTodoParent.removeClass(getFirstClass);
            }
            if (getSecondClass === 'card-die' || getSecondClass === 'card-live') {
                getTodoParent.removeClass(getSecondClass);
            }
            if (getThirdClass === 'card-die' || getThirdClass === 'card-live') {
                getTodoParent.removeClass(getThirdClass);
            }
            $(this).parents('.todo-item').addClass('card-unknow');
        } else if ($(this).parents('.todo-item').hasClass('card-unknow')) {
            $(this).parents('.todo-item').removeClass('card-unknow');
        }
        new CardCount('allcard');
        new CardCount('carddie');
        new CardCount('cardlive');
        new CardCount('cardunknow');
    });
}
function deletePermanentlyDropdown() {
    $('.action-dropdown .dropdown-menu .permanent-delete.dropdown-item').on('click', function (event) {
        event.preventDefault();
        if ($(this).parents('.todo-item').hasClass('card-unknow')) {
            $(this).parents('.todo-item').remove();
        }
    });
}
function reviveMailDropdown() {
    $('.action-dropdown .dropdown-menu .revive.dropdown-item').on('click', function (event) {
        event.preventDefault();
        if ($(this).parents('.todo-item').hasClass('card-unknow')) {
            var getTodoParent = $(this).parents('.todo-item');
            var getTodoClass = getTodoParent.attr('class');
            var getFirstClass = getTodoClass.split(' ')[1];
            $(this).parents('.todo-item').removeClass(getFirstClass);
            $(this).parents('.todo-item').addClass('all-card');
            $(this).parents('.todo-item').hide();
        }
        new CardCount('allcard');
        new CardCount('carddie');
        new CardCount('cardlive');
        new CardCount('cardunknow');
    });
}
function importantDropdown() {
    $('.important').click(function () {
        if (!$(this).parents('.todo-item').hasClass('card-live')) {
            $(this).parents('.todo-item').addClass('card-live');
            $(this).html('Back to List');
        } else if ($(this).parents('.todo-item').hasClass('card-live')) {
            $(this).parents('.todo-item').removeClass('card-live');
            $(this).html('Important');
            $(".list-actions#all-card").trigger('click');
        }
        new CardCount('cardlive');
    });
}
function priorityDropdown() {
    $('.priority-dropdown .dropdown-menu .dropdown-item').on('click', function (event) {
        var getClass = $(this).attr('class').split(' ')[1];
        var getDropdownClass = $(this).parents('.p-dropdown').children('.dropdown-toggle').attr('class').split(' ')[1];
        $(this).parents('.p-dropdown').children('.dropdown-toggle').removeClass(getDropdownClass);
        $(this).parents('.p-dropdown').children('.dropdown-toggle').addClass(getClass);
    })
}
function editDropdown() {
    $('.action-dropdown .dropdown-menu .edit.dropdown-item').click(function () {
        event.preventDefault();
        var $_outerThis = $(this);
        $('.add-tsk').hide();
        $('.edit-tsk').show();
        var $_taskTitle = $_outerThis.parents('.todo-item').children().find('.todo-heading').attr('data-todoHeading');
        var $_taskText = $_outerThis.parents('.todo-item').children().find('.todo-text').attr('data-todoText');
        var $_taskJson = JSON.parse($_taskText);
        $('#task').val($_taskTitle);
        quill.setContents($_taskJson);
        $('.edit-tsk').off('click').on('click', function (event) {
            var $_innerThis = $(this);
            var $_task = document.getElementById('task').value;
            var $_taskDescription = document.getElementById('taskdescription').value;
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth()); //January is 0!
            var yyyy = today.getFullYear();
            var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            today = monthNames[mm] + ', ' + dd + ' ' + yyyy;
            var $_taskDescriptionText = quill.getText();
            var $_taskDescriptionInnerHTML = quill.root.innerHTML;
            var delta = quill.getContents();
            var $_textDelta = JSON.stringify(delta);
            var length = 125;
            var trimmedString = $_taskDescriptionText.length > length ?
                $_taskDescriptionText.substring(0, length - 3) + "..." :
                $_taskDescriptionText;
            var $_taskEditedTitle = $_outerThis.parents('.todo-item').children().find('.todo-heading').html($_task);
            var $_taskEditedText = $_outerThis.parents('.todo-item').children().find('.todo-text').html(trimmedString);
            var $_taskEditedText = $_outerThis.parents('.todo-item').children().find('.meta-date').html(today);
            var $_taskEditedTitleDataAttr = $_outerThis.parents('.todo-item').children().find('.todo-heading').attr('data-todoHeading', $_task);
            var $_taskEditedTextDataAttr = $_outerThis.parents('.todo-item').children().find('.todo-text').attr('data-todoText', $_textDelta);
            var $_taskEditedTextDataAttr = $_outerThis.parents('.todo-item').children().find('.todo-text').attr('data-todoHtml', $_taskDescriptionInnerHTML);
            $('#addTaskModal').modal('hide');
        })
        $('#addTaskModal').modal('show');
    })
}
function todoItem() {
    $('.todo-item .todo-content').on('click', function (event) {
        event.preventDefault();
        var $_taskTitle = $(this).find('.todo-heading').attr('data-todoHeading');
        var $todoHtml = $(this).find('.todo-text').attr('data-todoHtml');
        $('.task-heading').text($_taskTitle);
        $('.task-text').html($todoHtml);
        $('#todoShowListItem').modal('show');
    });
}
var $btns = $('.list-actions').click(function () {
    if (this.id == 'all-card') {
        var $el = $('.' + this.id).fadeIn();
        $('#ct > div').not($el).hide();
    } else if (this.id == 'card-unknow') {
        var $el = $('.' + this.id).fadeIn();
        $('#ct > div').not($el).hide();
    } else {
        var $el = $('.' + this.id).fadeIn();
        $('#ct > div').not($el).hide();
    }
    $btns.removeClass('active');
    $(this).addClass('active');
})
todoItem();
$('.tab-title .nav-pills a.nav-link').on('click', function (event) {
    $(this).parents('.mail-box-container').find('.tab-title').removeClass('mail-menu-show')
    $(this).parents('.mail-box-container').find('.mail-overlay').removeClass('mail-overlay-show')
})