function ContactCreate(storeName, dataEntity, co_client)
{
	var pb_email 	= $("#pb_email").val();
	var co_type 	= $('input:radio[name=switch_2]:checked').val();

	var jsonCO = 	{
					"id": co_client.replace("PB-",""),
					"Email": pb_email,
					"Genero": co_type
					};

	var urlCO = "https://api.vtexcrm.com.br/" + storeName + "/dataentities/" + dataEntity + "/documents/";

	$.ajax({
		headers: {
			"Accept": "application/vnd.vtex.ds.v10+json",
			"Content-Type": "application/json"
		},
		data: JSON.stringify(jsonCO),
		type: 'PATCH',
		url: urlCO,
		success: function (data) {
		  console.log(data);
		  ResetMessages()
			showMessage($("#co_message_success"));
		  $("#pb_email").val("");
		  $("#co_type").val("");
		},
		error: function (data) {
		  console.log(data);
		  ResetMessages()
			showMessage($("#co_message_error"));

		}
	});
}

function ContactCreateByEmail(storeName, dataEntity, pb_email)
{
	var pb_url = "https://api.vtexcrm.com.br/" + storeName + "/dataentities/PB/search/?Email=" + pb_email + "&_fields=id";

	$.ajax({
		headers: {
			"Accept": "application/vnd.vtex.ds.v10+json",
			"Content-Type": "application/json"
		},
		type: 'GET',
		url: pb_url,
		success: function(data, textStatus, xhr){
			console.log(data);
			if(xhr.status == "200" || xhr.status == "201"){
				ContactCreate(storeName, dataEntity, data[0].id);
			}else{
				ResetMessages()
			showMessage($("#co_message_error"));

			}
		},
		error: function(data){
			console.log(data);
			ResetMessages()
			showMessage($("#co_message_error"));

		}
	});
}

function ClientCreate()
{
	var storeName		= $("#master_data_store_name").val();
	var dataEntity		= $("#master_data_data_entity").val();
	var pb_email 		= $("#pb_email").val();
	var co_type 		= $('input:radio[name=switch_2]:checked').val();

	var pb_json = 	{
					"Email": pb_email,
					"Genero": co_type
					};

	var pb_url = "https://api.vtexcrm.com.br/" + storeName + "/dataentities/PB/documents/";

	$.ajax({
		headers: {
			"Accept": "application/vnd.vtex.ds.v10+json",
			"Content-Type": "application/json"
		},
		data: JSON.stringify(pb_json),
		type: 'PATCH',
		url: pb_url,
		success: function(data, textStatus, xhr){
			console.log(data);
			console.log(xhr.status);
			if(xhr.status == "200" || xhr.status == "201"){
				ContactCreate(storeName, dataEntity, data.Id);
			}else if(xhr.status == "304"){
				ContactCreateByEmail(storeName, dataEntity, pb_email);
			}else{
				ResetMessages()
			showMessage($("#co_message_error"));
			}
		},
		error: function(data){
			console.log(data);
			ResetMessages()
			showMessage($("#co_message_error"));
		}
	});
}

function ResetMessages()
{
	$("#co_message_loading").hide();
	$("#co_message_validate").hide();
	$("#co_message_success").hide();
	$("#co_message_error").hide();
}

function IsEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}

function FormValidate()
{
	var isFormValidate = true;

	if((isFormValidate) && ($("#pb_email").val() == "")){
		isFormValidate = false;
		$("#pb_email").focus();
	}
	if((isFormValidate) && (!IsEmail($("#pb_email").val()))){
		isFormValidate = false;
		//$("#pb_email").val("");
		$("#pb_email").focus();
	}
	if((isFormValidate) && (!$("input[name='switch_2']:radio").is(':checked'))){
		isFormValidate = false;
	}

	if(isFormValidate){
		ResetMessages()
		$("#co_message_loading").show();
		ClientCreate();
	}else{
		ResetMessages()
		showMessage($("#co_message_validate"));
	}

	return false;
}
function showMessage(element){
	element.show();
	setTimeout(function(){element.hide(500);}, 3000);

}
